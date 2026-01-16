import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/lib/utils";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Te veel verzoeken" }, { status: 429 });
    }

    const data = await req.json();

    // Honeypot check
    if (data.honeypot) {
      return NextResponse.json({ success: true }); // Pretend success for bots
    }

    // Validation
    const errors: Record<string, string> = {};
    if (!data.name || data.name.length < 2) errors.name = "Naam is verplicht";
    if (!data.email) errors.email = "E-mail is verplicht";
    else if (!isValidEmail(data.email)) errors.email = "Ongeldig e-mailadres";
    if (!data.privacy) errors.privacy = "Privacy akkoord is verplicht";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Log the lead (in production: save to DB)
    console.log("=== NEW LEAD ===");
    console.log(JSON.stringify(data, null, 2));
    console.log(`Timestamp: ${new Date().toISOString()}`);

    // Send email notification (if configured)
    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
    
    // If Resend API key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "noreply@mijnpensioengevuld.nl",
            to: toEmail,
            subject: `Nieuw contactformulier: ${data.name}`,
            text: `
Nieuw bericht via ${siteConfig.name}

Naam: ${data.name}
E-mail: ${data.email}
Telefoon: ${data.phone || "Niet ingevuld"}

Bericht:
${data.message || "Geen bericht"}
            `,
          }),
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    // GoHighLevel webhook (if configured)
    if (process.env.GHL_WEBHOOK_URL) {
      try {
        await fetch(process.env.GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone || "",
            message: data.message || "",
            source: siteConfig.name,
          }),
        });
      } catch (webhookError) {
        console.error("GHL webhook failed:", webhookError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
