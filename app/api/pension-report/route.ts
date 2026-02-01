import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { siteConfig } from "@/config/site";

// AOW bedragen 2024 (bruto per maand)
const AOW_BEDRAGEN = {
  alleenstaand: 1558.35,
  samenwonend: 1070.26,
  alleenstaand_met_kind: 1402.63,
};

// AOW leeftijd tabel
function getAOWLeeftijd(geboortejaar: number): { leeftijd: number; maanden: number } {
  if (geboortejaar < 1955) return { leeftijd: 65, maanden: 0 };
  if (geboortejaar <= 1956) return { leeftijd: 66, maanden: 7 };
  if (geboortejaar === 1957) return { leeftijd: 66, maanden: 10 };
  if (geboortejaar >= 1958 && geboortejaar <= 1960) return { leeftijd: 67, maanden: 0 };
  return { leeftijd: 67, maanden: 3 };
}

// Jaarruimte berekening
function berekenJaarruimte(brutoInkomen: number): number {
  const franchise = 17545;
  const maxPremiegrondslag = 128810;
  const premiegrondslag = Math.min(Math.max(brutoInkomen - franchise, 0), maxPremiegrondslag - franchise);
  return Math.round(premiegrondslag * 0.3);
}

interface ReportData {
  naam: string;
  email: string;
  telefoon?: string;
  geboortejaar: string;
  leefsituatie: string;
  type_werknemer: string;
  bruto_jaarinkomen: string;
  werkgeverspensioen?: string;
}

export async function POST(request: Request) {
  try {
    const data: ReportData = await request.json();
    
    // Validation
    if (!data.naam || !data.email || !data.geboortejaar || !data.bruto_jaarinkomen) {
      return NextResponse.json({ error: "Ontbrekende verplichte velden" }, { status: 400 });
    }
    
    const geboortejaar = parseInt(data.geboortejaar);
    const brutoInkomen = parseFloat(data.bruto_jaarinkomen);
    const werkgeverspensioen = data.werkgeverspensioen ? parseFloat(data.werkgeverspensioen) : 0;
    
    // Calculate all pension data
    const huidigJaar = new Date().getFullYear();
    const huidigeLeeftijd = huidigJaar - geboortejaar;
    const aowLeeftijd = getAOWLeeftijd(geboortejaar);
    const jarenTotPensioen = (aowLeeftijd.leeftijd + aowLeeftijd.maanden / 12) - huidigeLeeftijd;
    
    // AOW berekening
    const aowBedragMaand = data.leefsituatie === "samenwonend" 
      ? AOW_BEDRAGEN.samenwonend 
      : data.leefsituatie === "alleenstaand_met_kind"
      ? AOW_BEDRAGEN.alleenstaand_met_kind
      : AOW_BEDRAGEN.alleenstaand;
    const aowBedragJaar = aowBedragMaand * 12;
    
    // Pensioengat
    const gewenstInkomen = brutoInkomen * 0.7;
    const totaalPensioen = aowBedragJaar + werkgeverspensioen;
    const pensioengat = Math.max(0, gewenstInkomen - totaalPensioen);
    const pensioengat_maand = pensioengat / 12;
    const dekkingsgraad = (totaalPensioen / gewenstInkomen) * 100;
    
    // Jaarruimte (voor ZZP/DGA)
    const jaarruimte = berekenJaarruimte(brutoInkomen);
    
    // Benodigd kapitaal
    const benodigdKapitaal = pensioengat > 0 ? Math.round(pensioengat / 0.04) : 0;
    
    // Maandelijkse inleg nodig
    let maandelijkseInleg = 0;
    if (pensioengat > 0 && jarenTotPensioen > 0) {
      const r = 0.04 / 12;
      const n = jarenTotPensioen * 12;
      maandelijkseInleg = Math.round(benodigdKapitaal * (r / (Math.pow(1 + r, n) - 1)));
    }
    
    // Risk level
    let risicoNiveau = "Laag";
    let risicoKleur = "#22c55e";
    let risicoEmoji = "🟢";
    if (dekkingsgraad < 50) {
      risicoNiveau = "Hoog";
      risicoKleur = "#ef4444";
      risicoEmoji = "🔴";
    } else if (dekkingsgraad < 70) {
      risicoNiveau = "Gemiddeld";
      risicoKleur = "#eab308";
      risicoEmoji = "🟡";
    }
    
    // Type werknemer tekst
    const typeTekst = data.type_werknemer === "loondienst" ? "Loondienst"
      : data.type_werknemer === "zzp" ? "ZZP'er / Freelancer"
      : data.type_werknemer === "dga" ? "DGA / Ondernemer"
      : "Combinatie";
    
    const leefsituatieTekst = data.leefsituatie === "samenwonend" ? "Samenwonend/Gehuwd" 
      : data.leefsituatie === "alleenstaand_met_kind" ? "Alleenstaand met kind" 
      : "Alleenstaand";

    // Generate advice
    let advies = "";
    if (dekkingsgraad >= 70) {
      advies = `
        <p style="color: #166534; font-weight: bold;">✅ Je pensioensituatie ziet er goed uit!</p>
        <p>Met een dekkingsgraad van ${dekkingsgraad.toFixed(0)}% ben je goed op weg. Blijf je huidige opbouw volhouden en check jaarlijks of je situatie nog klopt.</p>
      `;
    } else if (dekkingsgraad >= 50) {
      advies = `
        <p style="color: #ca8a04; font-weight: bold;">⚠️ Je hebt een pensioengat van €${Math.round(pensioengat_maand).toLocaleString('nl-NL')}/maand</p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Start met aanvullende pensioenopbouw</li>
          ${data.type_werknemer !== "loondienst" ? `<li>Benut je jaarruimte van €${jaarruimte.toLocaleString('nl-NL')}</li>` : ''}
          <li>Een inleg van €${maandelijkseInleg.toLocaleString('nl-NL')}/maand kan het gat dichten</li>
        </ul>
      `;
    } else {
      advies = `
        <p style="color: #dc2626; font-weight: bold;">🚨 Je pensioengat is aanzienlijk: €${Math.round(pensioengat_maand).toLocaleString('nl-NL')}/maand</p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li><strong>Maak pensioenopbouw nu prioriteit</strong></li>
          ${data.type_werknemer !== "loondienst" ? `<li>Benut je volledige jaarruimte van €${jaarruimte.toLocaleString('nl-NL')}</li>` : ''}
          <li>Onderzoek reserveringsruimte (tot 7 jaar terug)</li>
          <li>Plan een persoonlijk gesprek voor maatwerk advies</li>
        </ul>
      `;
    }

    // Generate email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jouw Pensioenrapport</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 650px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); border-radius: 16px 16px 0 0; padding: 30px; text-align: center;">
    <img src="${siteConfig.url}/logo-mijnpensioen.png" alt="MijnPensioenGevuld" style="height: 50px; margin-bottom: 15px;" />
    <h1 style="color: white; font-size: 24px; margin: 0;">Jouw Persoonlijke Pensioenrapport</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Opgesteld op ${new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
  </div>
  
  <!-- Main Content -->
  <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    
    <!-- Greeting -->
    <p style="font-size: 18px; margin-bottom: 25px;">
      Beste <strong>${data.naam}</strong>,
    </p>
    <p style="margin-bottom: 25px;">
      Bedankt voor je aanvraag. Hieronder vind je een overzicht van jouw pensioensituatie op basis van de door jou verstrekte gegevens.
    </p>
    
    <!-- Personal Info -->
    <div style="background: #f0fdfa; border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #99f6e4;">
      <h2 style="color: #0f766e; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">📋 Jouw Gegevens</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr><td style="padding: 5px 0; color: #64748b;">Geboortejaar:</td><td style="padding: 5px 0; font-weight: 600;">${geboortejaar}</td></tr>
        <tr><td style="padding: 5px 0; color: #64748b;">Huidige leeftijd:</td><td style="padding: 5px 0; font-weight: 600;">${huidigeLeeftijd} jaar</td></tr>
        <tr><td style="padding: 5px 0; color: #64748b;">Leefsituatie:</td><td style="padding: 5px 0; font-weight: 600;">${leefsituatieTekst}</td></tr>
        <tr><td style="padding: 5px 0; color: #64748b;">Werksituatie:</td><td style="padding: 5px 0; font-weight: 600;">${typeTekst}</td></tr>
        <tr><td style="padding: 5px 0; color: #64748b;">Bruto jaarinkomen:</td><td style="padding: 5px 0; font-weight: 600;">€${brutoInkomen.toLocaleString('nl-NL')}</td></tr>
      </table>
    </div>
    
    <!-- AOW Overview -->
    <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #e2e8f0;">
      <h2 style="color: #334155; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">📅 AOW-Overzicht</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr><td style="padding: 5px 0; color: #64748b;">AOW-leeftijd:</td><td style="padding: 5px 0; font-weight: 600;">${aowLeeftijd.leeftijd} jaar${aowLeeftijd.maanden > 0 ? ` en ${aowLeeftijd.maanden} maanden` : ''}</td></tr>
        <tr><td style="padding: 5px 0; color: #64748b;">Verwacht AOW bruto:</td><td style="padding: 5px 0; font-weight: 600;">€${aowBedragMaand.toFixed(2)}/maand</td></tr>
        <tr><td style="padding: 5px 0; color: #64748b;">Jaren tot pensioen:</td><td style="padding: 5px 0; font-weight: 600;">${Math.round(jarenTotPensioen)} jaar</td></tr>
      </table>
    </div>
    
    <!-- Pension Gap Analysis -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #fcd34d;">
      <h2 style="color: #92400e; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">📊 Pensioengat Analyse</h2>
      
      <table style="width: 100%; font-size: 14px; margin-bottom: 15px;">
        <tr><td style="padding: 5px 0; color: #78350f;">Gewenst inkomen (70%):</td><td style="padding: 5px 0; font-weight: 600; color: #78350f;">€${gewenstInkomen.toLocaleString('nl-NL')}/jaar</td></tr>
        <tr><td style="padding: 5px 0; color: #78350f;">Verwacht pensioen:</td><td style="padding: 5px 0; font-weight: 600; color: #78350f;">€${totaalPensioen.toLocaleString('nl-NL')}/jaar</td></tr>
        <tr style="border-top: 2px solid #fbbf24;">
          <td style="padding: 10px 0 5px 0; font-weight: bold; color: #92400e; font-size: 16px;">PENSIOENGAT:</td>
          <td style="padding: 10px 0 5px 0; font-weight: bold; color: #92400e; font-size: 16px;">€${Math.round(pensioengat).toLocaleString('nl-NL')}/jaar</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #78350f;"></td>
          <td style="padding: 5px 0; font-weight: 600; color: #78350f;">€${Math.round(pensioengat_maand).toLocaleString('nl-NL')}/maand</td>
        </tr>
      </table>
      
      <div style="display: flex; align-items: center; gap: 10px; padding: 15px; background: white; border-radius: 8px;">
        <span style="font-size: 24px;">${risicoEmoji}</span>
        <div>
          <p style="margin: 0; font-weight: bold; color: ${risicoKleur};">Risiconiveau: ${risicoNiveau}</p>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #78350f;">Dekkingsgraad: ${dekkingsgraad.toFixed(1)}%</p>
        </div>
      </div>
    </div>
    
    ${data.type_werknemer !== "loondienst" ? `
    <!-- Jaarruimte (for ZZP/DGA) -->
    <div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #bfdbfe;">
      <h2 style="color: #1e40af; font-size: 16px; margin: 0 0 10px 0;">💰 Jouw Fiscale Jaarruimte</h2>
      <p style="font-size: 28px; font-weight: bold; color: #1e40af; margin: 0;">€${jaarruimte.toLocaleString('nl-NL')}</p>
      <p style="font-size: 13px; color: #3730a3; margin: 10px 0 0 0;">Dit bedrag mag je fiscaal aftrekbaar inleggen in lijfrente of banksparen.</p>
    </div>
    ` : ''}
    
    <!-- Goal Calculation -->
    <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #bbf7d0;">
      <h2 style="color: #166534; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">🎯 Wat heb je nodig?</h2>
      <table style="width: 100%; font-size: 14px;">
        <tr><td style="padding: 5px 0; color: #166534;">Benodigd kapitaal:</td><td style="padding: 5px 0; font-weight: 600; color: #166534;">€${benodigdKapitaal.toLocaleString('nl-NL')}</td></tr>
        <tr><td style="padding: 5px 0; color: #166534;">Geschatte inleg nodig:</td><td style="padding: 5px 0; font-weight: 600; color: #166534;">€${maandelijkseInleg.toLocaleString('nl-NL')}/maand</td></tr>
      </table>
      <p style="font-size: 12px; color: #15803d; margin: 10px 0 0 0;">* Bij 4% gemiddeld rendement per jaar</p>
    </div>
    
    <!-- Advice -->
    <div style="background: #fafafa; border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid ${risicoKleur};">
      <h2 style="color: #334155; font-size: 16px; margin: 0 0 15px 0;">💡 Persoonlijk Advies</h2>
      ${advies}
    </div>
    
    <!-- CTA -->
    <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 25px;">
      <h2 style="color: white; font-size: 20px; margin: 0 0 10px 0;">Wil je persoonlijk advies?</h2>
      <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">
        Plan een gratis gesprek en krijg maatwerk advies van onze pensioenadviseur.
      </p>
      <a href="${siteConfig.url}/#contact" 
         style="display: inline-block; background: white; color: #0f766e; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 16px;">
        Plan gratis gesprek →
      </a>
    </div>
    
    <!-- Disclaimer -->
    <div style="font-size: 12px; color: #94a3b8; padding: 15px; background: #f8fafc; border-radius: 8px;">
      <strong>Disclaimer:</strong> Dit rapport is indicatief en gebaseerd op de verstrekte gegevens en huidige regelgeving (2024). 
      Rendementen uit het verleden bieden geen garantie voor de toekomst. Voor definitief advies raden wij een gesprek met een 
      gekwalificeerd pensioenadviseur aan.
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; padding: 25px; color: #64748b; font-size: 13px;">
    <p style="margin: 0 0 10px 0;">
      <strong>MijnPensioenGevuld.nl</strong><br>
      Onafhankelijk pensioenadvies met persoonlijke aandacht
    </p>
    <p style="margin: 0; font-size: 12px;">
      ${siteConfig.contact.phone} • ${siteConfig.contact.email}
    </p>
  </div>
  
</body>
</html>
    `;
    
    // Send email to user
    await sendEmail({
      to: data.email,
      subject: `Jouw Pensioenrapport - ${data.naam}`,
      html: emailHtml,
    });
    
    // Send notification to admin
    const adminNotification = `
      <h2>📊 Nieuw Pensioenrapport Aangevraagd</h2>
      <p><strong>Naam:</strong> ${data.naam}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefoon:</strong> ${data.telefoon || 'Niet opgegeven'}</p>
      <p><strong>Geboortejaar:</strong> ${geboortejaar}</p>
      <p><strong>Werksituatie:</strong> ${typeTekst}</p>
      <p><strong>Inkomen:</strong> €${brutoInkomen.toLocaleString('nl-NL')}</p>
      <p><strong>Pensioengat:</strong> €${Math.round(pensioengat_maand)}/maand</p>
      <p><strong>Dekkingsgraad:</strong> ${dekkingsgraad.toFixed(1)}%</p>
      <p><strong>Risico:</strong> ${risicoNiveau}</p>
    `;
    
    await sendEmail({
      to: siteConfig.contact.email,
      subject: `Nieuw Pensioenrapport: ${data.naam} (${risicoNiveau} risico)`,
      html: adminNotification,
    });
    
    // Also save as lead in database if you have one
    // await saveLeadToDatabase(data);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Pension report error:", error);
    return NextResponse.json({ error: "Er ging iets mis" }, { status: 500 });
  }
}
