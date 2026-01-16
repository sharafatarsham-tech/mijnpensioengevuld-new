import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { siteConfig } from "@/config/site";

// POST - Send email campaign to all active subscribers
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { subject, content, testEmail } = body;

    if (!subject || !content) {
      return NextResponse.json(
        { error: "Subject and content are required" },
        { status: 400 }
      );
    }

    // If testEmail is provided, send only to that email
    if (testEmail) {
      const result = await sendEmail({
        to: testEmail,
        subject: `[TEST] ${subject}`,
        html: wrapEmailContent(content),
      });

      return NextResponse.json({
        success: true,
        test: true,
        sent: result.success ? 1 : 0,
      });
    }

    // Get all active subscribers
    const { data: subscribers, error } = await supabaseAdmin
      .from("subscribers")
      .select("email, name")
      .eq("status", "active");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: "No active subscribers found" },
        { status: 400 }
      );
    }

    // Save campaign
    const { data: campaign, error: campaignError } = await supabaseAdmin
      .from("email_campaigns")
      .insert({
        subject,
        content,
        status: "sent",
        sent_count: subscribers.length,
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (campaignError) {
      console.error("Campaign save error:", campaignError);
    }

    // Send emails in batches of 10 to avoid rate limits
    const batchSize = 10;
    let sentCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (subscriber) => {
          const result = await sendEmail({
            to: subscriber.email,
            subject,
            html: wrapEmailContent(content, subscriber.name),
          });

          if (result.success) {
            sentCount++;
          } else {
            errors.push(`${subscriber.email}: ${result.error}`);
          }
        })
      );

      // Small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json({
      success: true,
      campaign: campaign?.id,
      total: subscribers.length,
      sent: sentCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}

// Wrap content in email template
function wrapEmailContent(content: string, name?: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="${siteConfig.url}/logo-mijnpensioen.png" alt="MijnPensioenGevuld" style="height: 60px; display: inline-block;" />
  </div>
  
  ${name ? `<p style="margin-bottom: 15px;">Beste ${name},</p>` : ""}
  
  ${content}
  
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
  
  <p style="color: #64748b; font-size: 14px; text-align: center;">
    Met vriendelijke groet,<br>
    <strong>Team MijnPensioenGevuld</strong>
  </p>
  
  <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
    <a href="https://mijnpensioengevuld.nl/unsubscribe" style="color: #94a3b8;">Uitschrijven</a>
  </p>
</body>
</html>
  `;
}
