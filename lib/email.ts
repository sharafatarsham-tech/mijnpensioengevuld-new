import { Resend } from "resend";
import { siteConfig } from "@/config/site";

// Only initialize Resend if API key is provided
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.EMAIL_FROM || "MijnPensioenGevuld <onboarding@resend.dev>";
const LOGO_URL = `${siteConfig.url}/logo-mijnpensioen.png`;

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  // If Resend is not configured, skip email sending
  if (!resend) {
    console.log("Email skipped (no RESEND_API_KEY configured):", { to, subject });
    return { success: true, skipped: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    });

    if (error) {
      console.error("Email error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email exception:", error);
    return { success: false, error };
  }
}

// Welcome email template for new subscribers
export function getWelcomeEmailHtml(name?: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welkom bij MijnPensioenGevuld</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="${LOGO_URL}" alt="MijnPensioenGevuld" style="height: 60px; display: inline-block;" />
  </div>
  
  <h1 style="color: #f97316; font-size: 24px; margin-bottom: 20px;">
    Welkom${name ? ` ${name}` : ""}! 🎉
  </h1>
  
  <p style="margin-bottom: 15px;">
    Bedankt voor je aanmelding bij MijnPensioenGevuld. Je ontvangt vanaf nu waardevolle tips en inzichten over pensioenplanning.
  </p>
  
  <div style="background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%); border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #fed7aa;">
    <h2 style="color: #ea580c; font-size: 18px; margin: 0 0 10px 0;">
      💡 Wist je dat...
    </h2>
    <p style="margin: 0; color: #78350f;">
      De meeste Nederlanders pas op hun 60e serieus naar hun pensioen kijken? Dan is er vaak nog maar weinig tijd om bij te sturen. Hoe eerder je begint, hoe meer mogelijkheden je hebt.
    </p>
  </div>
  
  <p style="margin-bottom: 15px;">
    Heb je vragen over jouw pensioensituatie? Plan dan een <strong>gratis inventarisatiegesprek</strong> van 1-1,5 uur. Wij brengen je complete situatie in kaart.
  </p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://mijnpensioengevuld.nl/#contact" 
       style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">
      Plan gratis gesprek →
    </a>
  </div>
  
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
  
  <p style="color: #64748b; font-size: 14px; text-align: center;">
    Met vriendelijke groet,<br>
    <strong>Team MijnPensioenGevuld</strong>
  </p>
  
  <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
    Je ontvangt deze email omdat je je hebt aangemeld voor onze nieuwsbrief.<br>
    <a href="https://mijnpensioengevuld.nl/unsubscribe" style="color: #94a3b8;">Uitschrijven</a>
  </p>
</body>
</html>
  `;
}

// Lead notification email template (for admin)
export function getLeadNotificationHtml(lead: { name: string; email: string; phone?: string; message?: string }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nieuwe Lead</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #16a34a; font-size: 24px;">🎉 Nieuwe Contactaanvraag!</h1>
  
  <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
    <p style="margin: 5px 0;"><strong>Naam:</strong> ${lead.name}</p>
    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
    ${lead.phone ? `<p style="margin: 5px 0;"><strong>Telefoon:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>` : ""}
    ${lead.message ? `<p style="margin: 5px 0;"><strong>Bericht:</strong><br>${lead.message}</p>` : ""}
  </div>
  
  <p style="color: #64748b; font-size: 14px;">
    Bekijk alle leads in je <a href="https://mijnpensioengevuld.nl/admin">admin dashboard</a>.
  </p>
</body>
</html>
  `;
}
