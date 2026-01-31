#!/usr/bin/env node
/**
 * Pensioen Calculator MCP Server
 *
 * Een MCP server voor Nederlandse pensioenberekeningen.
 * Biedt tools voor AOW-berekeningen, jaarruimte, pensioengat analyse en meer.
 *
 * @author MijnPensioenGevuld.nl
 * @version 1.0.0
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
// =============================================================================
// CONSTANTS - Nederlandse pensioenregelgeving 2024/2025
// =============================================================================
const AOW_LEEFTIJD_TABEL = {
    // Geboortejaar -> AOW-leeftijd
    1955: { leeftijd: 66, maanden: 7 },
    1956: { leeftijd: 66, maanden: 7 },
    1957: { leeftijd: 66, maanden: 10 },
    1958: { leeftijd: 67, maanden: 0 },
    1959: { leeftijd: 67, maanden: 0 },
    1960: { leeftijd: 67, maanden: 0 },
    1961: { leeftijd: 67, maanden: 3 },
    1962: { leeftijd: 67, maanden: 3 },
    1963: { leeftijd: 67, maanden: 3 },
    1964: { leeftijd: 67, maanden: 3 },
    1965: { leeftijd: 67, maanden: 3 },
    // Vanaf 1966: gekoppeld aan levensverwachting, voorlopig 67 jaar en 3 maanden
};
// AOW bedragen 2024 (bruto per maand)
const AOW_BEDRAGEN_2024 = {
    alleenstaand: 1558.35,
    samenwonend: 1070.26, // per persoon
    alleenstaandMetKind: 1402.63,
};
// Jaarruimte constanten 2024
const JAARRUIMTE_2024 = {
    premiegrondslag_max: 128810, // Maximale premiegrondslag
    franchise: 17545, // AOW-franchise
    percentage: 0.3, // 30% van premiegrondslag
    factor_a: 6.27, // Factor A voor pensioenopbouw werkgever
};
// Reserveringsruimte
const RESERVERINGSRUIMTE = {
    max_jaren: 7, // Maximaal 7 jaar terug
    max_bedrag_per_jaar: 8065, // Maximum per jaar (2024)
    totaal_max: 38000, // Totaal maximum
};
// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
/**
 * Bereken AOW-leeftijd op basis van geboortejaar
 */
function getAOWLeeftijd(geboortejaar) {
    if (geboortejaar < 1955) {
        return { leeftijd: 65, maanden: 0 };
    }
    if (geboortejaar in AOW_LEEFTIJD_TABEL) {
        return AOW_LEEFTIJD_TABEL[geboortejaar];
    }
    // Vanaf 1966: voorlopig 67 jaar en 3 maanden (kan wijzigen)
    return { leeftijd: 67, maanden: 3 };
}
/**
 * Bereken AOW-ingangsdatum
 */
function getAOWIngangsdatum(geboortedatum) {
    const geboortejaar = geboortedatum.getFullYear();
    const aowLeeftijd = getAOWLeeftijd(geboortejaar);
    const ingangsdatum = new Date(geboortedatum);
    ingangsdatum.setFullYear(ingangsdatum.getFullYear() + aowLeeftijd.leeftijd);
    ingangsdatum.setMonth(ingangsdatum.getMonth() + aowLeeftijd.maanden);
    return ingangsdatum;
}
/**
 * Bereken jaarruimte
 */
function berekenJaarruimte(brutoJaarinkomen, factorA = 0, pensioenopbouwWerkgever = 0) {
    // Stap 1: Bepaal premiegrondslag
    const premiegrondslag = Math.min(Math.max(brutoJaarinkomen - JAARRUIMTE_2024.franchise, 0), JAARRUIMTE_2024.premiegrondslag_max - JAARRUIMTE_2024.franchise);
    // Stap 2: Bereken bruto jaarruimte (30% van premiegrondslag)
    const brutoJaarruimte = premiegrondslag * JAARRUIMTE_2024.percentage;
    // Stap 3: Trek pensioenopbouw werkgever af (Factor A × opbouw)
    const aftrekWerkgever = factorA * pensioenopbouwWerkgever;
    // Stap 4: Netto jaarruimte
    const jaarruimte = Math.max(brutoJaarruimte - aftrekWerkgever, 0);
    const berekening = `
📊 Jaarruimte Berekening:
━━━━━━━━━━━━━━━━━━━━━━━
Bruto jaarinkomen:        €${brutoJaarinkomen.toLocaleString('nl-NL')}
AOW-franchise:            €${JAARRUIMTE_2024.franchise.toLocaleString('nl-NL')}
━━━━━━━━━━━━━━━━━━━━━━━
Premiegrondslag:          €${premiegrondslag.toLocaleString('nl-NL')}
× 30%:                    €${brutoJaarruimte.toLocaleString('nl-NL')}
- Werkgeverpensioen:      €${aftrekWerkgever.toLocaleString('nl-NL')}
━━━━━━━━━━━━━━━━━━━━━━━
JAARRUIMTE 2024:          €${Math.round(jaarruimte).toLocaleString('nl-NL')}
`.trim();
    return {
        jaarruimte: Math.round(jaarruimte),
        premiegrondslag,
        berekening,
    };
}
/**
 * Bereken pensioengat
 */
function berekenPensioengat(huidigInkomen, verwachtPensioen, gewenstInkomenPercentage = 70) {
    const gewenstInkomen = (huidigInkomen * gewenstInkomenPercentage) / 100;
    const pensioengat = Math.max(gewenstInkomen - verwachtPensioen, 0);
    const maandelijksGat = pensioengat / 12;
    const dekkingsgraad = verwachtPensioen > 0
        ? Math.round((verwachtPensioen / gewenstInkomen) * 100)
        : 0;
    let risicoNiveau;
    let advies;
    if (dekkingsgraad >= 90) {
        risicoNiveau = "🟢 Laag risico";
        advies = "Je pensioensituatie lijkt goed op orde. Een periodieke check blijft verstandig.";
    }
    else if (dekkingsgraad >= 70) {
        risicoNiveau = "🟡 Matig risico";
        advies = "Er zijn aandachtspunten. Overweeg aanvullende pensioenopbouw via lijfrente of beleggen.";
    }
    else {
        risicoNiveau = "🔴 Hoog risico";
        advies = "Je situatie vraagt duidelijk om aandacht. Een persoonlijk adviesgesprek is sterk aan te raden.";
    }
    const analyse = `
📊 Pensioengat Analyse
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Huidig bruto jaarinkomen:     €${huidigInkomen.toLocaleString('nl-NL')}
Gewenst pensioen (${gewenstInkomenPercentage}%):      €${Math.round(gewenstInkomen).toLocaleString('nl-NL')}
Verwacht pensioen:            €${Math.round(verwachtPensioen).toLocaleString('nl-NL')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PENSIOENGAT (per jaar):       €${Math.round(pensioengat).toLocaleString('nl-NL')}
PENSIOENGAT (per maand):      €${Math.round(maandelijksGat).toLocaleString('nl-NL')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dekkingsgraad:                ${dekkingsgraad}%
Risico niveau:                ${risicoNiveau}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Advies: ${advies}
`.trim();
    return {
        pensioengat: Math.round(pensioengat),
        gewenstInkomen: Math.round(gewenstInkomen),
        maandelijksGat: Math.round(maandelijksGat),
        analyse,
    };
}
/**
 * Bereken benodigde maandelijkse inleg
 */
function berekenBenodidgeInleg(doelbedrag, jarenTotPensioen, verwachtRendement = 4) {
    const maandRendement = verwachtRendement / 100 / 12;
    const aantalMaanden = jarenTotPensioen * 12;
    // PMT formule: M = FV × (r / ((1 + r)^n - 1))
    let maandelijkseInleg;
    if (verwachtRendement === 0) {
        maandelijkseInleg = doelbedrag / aantalMaanden;
    }
    else {
        maandelijkseInleg = doelbedrag * (maandRendement / (Math.pow(1 + maandRendement, aantalMaanden) - 1));
    }
    const totaalIngelegd = maandelijkseInleg * aantalMaanden;
    const totaalRendement = doelbedrag - totaalIngelegd;
    const berekening = `
📊 Benodigde Inleg Berekening
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Doelbedrag:                   €${doelbedrag.toLocaleString('nl-NL')}
Jaren tot pensioen:           ${jarenTotPensioen} jaar
Verwacht rendement:           ${verwachtRendement}% per jaar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MAANDELIJKSE INLEG:           €${Math.round(maandelijkseInleg).toLocaleString('nl-NL')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Totaal ingelegd:              €${Math.round(totaalIngelegd).toLocaleString('nl-NL')}
Verwacht rendement:           €${Math.round(totaalRendement).toLocaleString('nl-NL')}
Eindwaarde:                   €${doelbedrag.toLocaleString('nl-NL')}

⚠️ Let op: Dit is een indicatieve berekening. 
Rendementen uit het verleden bieden geen garantie voor de toekomst.
`.trim();
    return {
        maandelijkseInleg: Math.round(maandelijkseInleg),
        totaalIngelegd: Math.round(totaalIngelegd),
        totaalRendement: Math.round(totaalRendement),
        berekening,
    };
}
/**
 * Vergelijk pensioen scenario's
 */
function vergelijkScenarios(huidigInkomen, huidigeLeeftijd, pensioenLeeftijd, scenarios) {
    const jarenTotPensioen = pensioenLeeftijd - huidigeLeeftijd;
    let vergelijking = `
📊 Scenario Vergelijking
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Huidig inkomen: €${huidigInkomen.toLocaleString('nl-NL')} | Leeftijd: ${huidigeLeeftijd} | Pensioen: ${pensioenLeeftijd}
Jaren tot pensioen: ${jarenTotPensioen} jaar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
    scenarios.forEach((scenario, index) => {
        const maandRendement = scenario.verwachtRendement / 100 / 12;
        const aantalMaanden = jarenTotPensioen * 12;
        let eindwaarde;
        if (scenario.verwachtRendement === 0) {
            eindwaarde = scenario.maandelijkseInleg * aantalMaanden;
        }
        else {
            eindwaarde = scenario.maandelijkseInleg * ((Math.pow(1 + maandRendement, aantalMaanden) - 1) / maandRendement);
        }
        const totaalIngelegd = scenario.maandelijkseInleg * aantalMaanden;
        const rendement = eindwaarde - totaalIngelegd;
        // Schat maandelijks pensioeninkomen (4% onttrekkingsregel)
        const jaarlijksInkomen = eindwaarde * 0.04;
        const maandelijksInkomen = jaarlijksInkomen / 12;
        vergelijking += `
📌 Scenario ${index + 1}: ${scenario.naam}
   Maandelijkse inleg:     €${scenario.maandelijkseInleg.toLocaleString('nl-NL')}
   Verwacht rendement:     ${scenario.verwachtRendement}%
   ─────────────────────────
   Totaal ingelegd:        €${Math.round(totaalIngelegd).toLocaleString('nl-NL')}
   Verwacht rendement:     €${Math.round(rendement).toLocaleString('nl-NL')}
   EINDWAARDE:             €${Math.round(eindwaarde).toLocaleString('nl-NL')}
   ─────────────────────────
   Geschat extra pensioen: €${Math.round(maandelijksInkomen).toLocaleString('nl-NL')}/maand

`;
    });
    vergelijking += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Disclaimer: Dit zijn indicatieve berekeningen. Rendementen zijn niet gegarandeerd.
   Raadpleeg een gekwalificeerd adviseur voor persoonlijk advies.
`.trim();
    return vergelijking;
}
// =============================================================================
// ZOD SCHEMAS - Input Validation
// =============================================================================
const CalculateAOWAgeSchema = z.object({
    geboortejaar: z.number()
        .int()
        .min(1940, "Geboortejaar moet na 1940 zijn")
        .max(2010, "Geboortejaar moet voor 2010 zijn")
        .describe("Het geboortejaar van de persoon (bijv. 1985)"),
    geboortemaand: z.number()
        .int()
        .min(1, "Maand moet tussen 1 en 12 zijn")
        .max(12, "Maand moet tussen 1 en 12 zijn")
        .optional()
        .describe("De geboortemaand (1-12), optioneel voor exacte berekening"),
    geboortedag: z.number()
        .int()
        .min(1)
        .max(31)
        .optional()
        .describe("De geboortedag (1-31), optioneel voor exacte berekening"),
}).strict();
const CalculateAOWAmountSchema = z.object({
    leefsituatie: z.enum(["alleenstaand", "samenwonend", "alleenstaand_met_kind"])
        .describe("De leefsituatie: 'alleenstaand', 'samenwonend', of 'alleenstaand_met_kind'"),
    opbouwjaren: z.number()
        .min(0)
        .max(50)
        .optional()
        .default(50)
        .describe("Aantal jaren AOW-opbouw in Nederland (max 50 jaar voor volledig AOW)"),
}).strict();
const CalculateJaarruimteSchema = z.object({
    bruto_jaarinkomen: z.number()
        .min(0)
        .max(1000000)
        .describe("Het bruto jaarinkomen in euro's"),
    factor_a: z.number()
        .min(0)
        .max(10)
        .optional()
        .default(0)
        .describe("Factor A van de werkgever pensioenregeling (staat op het UPO)"),
    pensioenopbouw_werkgever: z.number()
        .min(0)
        .optional()
        .default(0)
        .describe("Jaarlijkse pensioenopbouw bij werkgever in euro's"),
}).strict();
const CalculateReserveringsruimteSchema = z.object({
    onbenutte_jaarruimtes: z.array(z.object({
        jaar: z.number().int().min(2017).max(2024),
        bedrag: z.number().min(0),
    })).describe("Lijst van onbenutte jaarruimtes per jaar"),
}).strict();
const CalculatePensionGapSchema = z.object({
    huidig_inkomen: z.number()
        .min(0)
        .max(1000000)
        .describe("Huidig bruto jaarinkomen in euro's"),
    verwacht_pensioen: z.number()
        .min(0)
        .describe("Verwacht totaal pensioeninkomen per jaar (AOW + werkgeverspensioen + overig)"),
    gewenst_percentage: z.number()
        .min(50)
        .max(100)
        .optional()
        .default(70)
        .describe("Gewenst percentage van huidig inkomen bij pensioen (standaard 70%)"),
}).strict();
const CalculateRequiredSavingsSchema = z.object({
    doelbedrag: z.number()
        .min(1000)
        .max(10000000)
        .describe("Het gewenste eindbedrag bij pensioen in euro's"),
    jaren_tot_pensioen: z.number()
        .int()
        .min(1)
        .max(50)
        .describe("Aantal jaren tot pensioenleeftijd"),
    verwacht_rendement: z.number()
        .min(0)
        .max(15)
        .optional()
        .default(4)
        .describe("Verwacht jaarlijks rendement in procenten (standaard 4%)"),
}).strict();
const CompareScenariosSchema = z.object({
    huidig_inkomen: z.number().min(0).describe("Huidig bruto jaarinkomen"),
    huidige_leeftijd: z.number().int().min(18).max(67).describe("Huidige leeftijd"),
    pensioen_leeftijd: z.number().int().min(55).max(75).describe("Gewenste pensioenleeftijd"),
    scenarios: z.array(z.object({
        naam: z.string().describe("Naam van het scenario"),
        maandelijkse_inleg: z.number().min(0).describe("Maandelijkse inleg in euro's"),
        verwacht_rendement: z.number().min(0).max(15).describe("Verwacht rendement in %"),
    })).min(1).max(5).describe("Lijst van scenario's om te vergelijken (max 5)"),
}).strict();
// =============================================================================
// TOOL DEFINITIONS
// =============================================================================
const tools = [
    {
        name: "calculate_aow_age",
        description: `Bereken de AOW-leeftijd op basis van geboortejaar.

De AOW-leeftijd is afhankelijk van het geboortejaar en wordt periodiek aangepast 
aan de levensverwachting. Deze tool geeft de actuele AOW-leeftijd en ingangsdatum.

Gebruik deze tool wanneer:
- Je wilt weten wanneer iemand AOW ontvangt
- Je de exacte AOW-ingangsdatum nodig hebt voor pensioenplanning
- Je wilt vergelijken met de gewenste pensioenleeftijd

Returns: AOW-leeftijd, ingangsdatum, en jaren tot AOW.`,
        inputSchema: {
            type: "object",
            properties: {
                geboortejaar: {
                    type: "number",
                    description: "Het geboortejaar (bijv. 1985)",
                },
                geboortemaand: {
                    type: "number",
                    description: "De geboortemaand (1-12), optioneel",
                },
                geboortedag: {
                    type: "number",
                    description: "De geboortedag (1-31), optioneel",
                },
            },
            required: ["geboortejaar"],
        },
    },
    {
        name: "calculate_aow_amount",
        description: `Bereken het verwachte bruto AOW-bedrag per maand.

Het AOW-bedrag is afhankelijk van de leefsituatie en het aantal opbouwjaren.
Voor elk jaar dat je in Nederland woont/werkt tussen je 15e en AOW-leeftijd 
bouw je 2% AOW op. Maximaal 50 jaar = 100% AOW.

Gebruik deze tool wanneer:
- Je het verwachte AOW-inkomen wilt weten
- Je een pensioengat wilt berekenen
- Je de impact van emigratie op AOW wilt zien

Returns: Bruto en netto AOW-bedrag per maand en per jaar.`,
        inputSchema: {
            type: "object",
            properties: {
                leefsituatie: {
                    type: "string",
                    enum: ["alleenstaand", "samenwonend", "alleenstaand_met_kind"],
                    description: "De leefsituatie bij pensioen",
                },
                opbouwjaren: {
                    type: "number",
                    description: "Aantal jaren AOW-opbouw (max 50)",
                },
            },
            required: ["leefsituatie"],
        },
    },
    {
        name: "calculate_jaarruimte",
        description: `Bereken de fiscale jaarruimte voor lijfrente-aftrek.

De jaarruimte bepaalt hoeveel je fiscaal voordelig mag inleggen in een 
lijfrente of banksparen product. De berekening houdt rekening met je 
inkomen en eventuele pensioenopbouw bij een werkgever.

Formule: (premiegrondslag × 30%) - (Factor A × werkgeverpensioen)

Gebruik deze tool wanneer:
- Je wilt weten hoeveel je fiscaal aftrekbaar kunt sparen
- Je de optimale lijfrente-inleg wilt bepalen
- Je als ZZP'er je pensioenruimte wilt berekenen

Returns: Jaarruimte bedrag en gedetailleerde berekening.`,
        inputSchema: {
            type: "object",
            properties: {
                bruto_jaarinkomen: {
                    type: "number",
                    description: "Bruto jaarinkomen in euro's",
                },
                factor_a: {
                    type: "number",
                    description: "Factor A van werkgeverpensioen (optioneel)",
                },
                pensioenopbouw_werkgever: {
                    type: "number",
                    description: "Jaarlijkse pensioenopbouw werkgever (optioneel)",
                },
            },
            required: ["bruto_jaarinkomen"],
        },
    },
    {
        name: "calculate_pension_gap",
        description: `Analyseer het pensioengat - het verschil tussen gewenst en verwacht pensioen.

Het pensioengat is het verschil tussen wat je wilt ontvangen bij pensioen 
(meestal 70-80% van je huidige inkomen) en wat je daadwerkelijk opbouwt.

Deze tool berekent:
- Het jaarlijkse en maandelijkse pensioengat
- De dekkingsgraad van je pensioen
- Het risiconiveau van je situatie
- Passend advies

Gebruik deze tool wanneer:
- Je wilt weten of je pensioen voldoende is
- Je de urgentie van actie wilt bepalen
- Je een indicatie wilt van aanvullende opbouw

Returns: Pensioengat analyse met risico-inschatting en advies.`,
        inputSchema: {
            type: "object",
            properties: {
                huidig_inkomen: {
                    type: "number",
                    description: "Huidig bruto jaarinkomen",
                },
                verwacht_pensioen: {
                    type: "number",
                    description: "Verwacht totaal pensioeninkomen per jaar",
                },
                gewenst_percentage: {
                    type: "number",
                    description: "Gewenst percentage van inkomen (standaard 70%)",
                },
            },
            required: ["huidig_inkomen", "verwacht_pensioen"],
        },
    },
    {
        name: "calculate_required_savings",
        description: `Bereken de benodigde maandelijkse inleg om een doelbedrag te bereiken.

Deze tool berekent hoeveel je maandelijks moet inleggen om een bepaald 
kapitaal op te bouwen voor je pensioen, rekening houdend met samengestelde 
rente (compound interest).

Gebruik deze tool wanneer:
- Je wilt weten hoeveel je moet sparen voor een bepaald doel
- Je de haalbaarheid van een pensioendoel wilt toetsen
- Je verschillende inlegbedragen wilt vergelijken

Returns: Benodigde maandelijkse inleg en totale berekening.`,
        inputSchema: {
            type: "object",
            properties: {
                doelbedrag: {
                    type: "number",
                    description: "Gewenst eindbedrag in euro's",
                },
                jaren_tot_pensioen: {
                    type: "number",
                    description: "Aantal jaren tot pensioen",
                },
                verwacht_rendement: {
                    type: "number",
                    description: "Verwacht jaarlijks rendement in % (standaard 4%)",
                },
            },
            required: ["doelbedrag", "jaren_tot_pensioen"],
        },
    },
    {
        name: "compare_pension_scenarios",
        description: `Vergelijk verschillende pensioenopbouw scenario's naast elkaar.

Deze tool helpt bij het maken van keuzes door meerdere scenario's te 
berekenen en te vergelijken. Je kunt variëren met inleg en rendement.

Gebruik deze tool wanneer:
- Je verschillende opties wilt vergelijken
- Je de impact van meer/minder inleg wilt zien
- Je conservatieve vs optimistische scenario's wilt doorrekenen

Returns: Vergelijkingstabel met alle scenario's.`,
        inputSchema: {
            type: "object",
            properties: {
                huidig_inkomen: {
                    type: "number",
                    description: "Huidig bruto jaarinkomen",
                },
                huidige_leeftijd: {
                    type: "number",
                    description: "Huidige leeftijd",
                },
                pensioen_leeftijd: {
                    type: "number",
                    description: "Gewenste pensioenleeftijd",
                },
                scenarios: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            naam: { type: "string" },
                            maandelijkse_inleg: { type: "number" },
                            verwacht_rendement: { type: "number" },
                        },
                        required: ["naam", "maandelijkse_inleg", "verwacht_rendement"],
                    },
                    description: "Lijst van scenario's (max 5)",
                },
            },
            required: ["huidig_inkomen", "huidige_leeftijd", "pensioen_leeftijd", "scenarios"],
        },
    },
];
// =============================================================================
// TOOL HANDLERS
// =============================================================================
async function handleCalculateAOWAge(args) {
    const { geboortejaar, geboortemaand = 6, geboortedag = 15 } = args;
    const geboortedatum = new Date(geboortejaar, geboortemaand - 1, geboortedag);
    const aowLeeftijd = getAOWLeeftijd(geboortejaar);
    const ingangsdatum = getAOWIngangsdatum(geboortedatum);
    const vandaag = new Date();
    const leeftijdNu = vandaag.getFullYear() - geboortejaar;
    const jarenTotAOW = Math.max(0, ingangsdatum.getFullYear() - vandaag.getFullYear());
    const aowLeeftijdStr = aowLeeftijd.maanden > 0
        ? `${aowLeeftijd.leeftijd} jaar en ${aowLeeftijd.maanden} maanden`
        : `${aowLeeftijd.leeftijd} jaar`;
    return `
📊 AOW-leeftijd Berekening
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Geboortejaar:             ${geboortejaar}
Geboortedatum:            ${geboortedatum.toLocaleDateString('nl-NL')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AOW-LEEFTIJD:             ${aowLeeftijdStr}
AOW-INGANGSDATUM:         ${ingangsdatum.toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Huidige leeftijd (circa): ${leeftijdNu} jaar
Jaren tot AOW:            ${jarenTotAOW} jaar

ℹ️ De AOW-leeftijd is gekoppeld aan de levensverwachting en kan in de toekomst wijzigen.
`.trim();
}
async function handleCalculateAOWAmount(args) {
    const { leefsituatie, opbouwjaren = 50 } = args;
    let basisbedrag;
    let leefsituatieNL;
    switch (leefsituatie) {
        case "alleenstaand":
            basisbedrag = AOW_BEDRAGEN_2024.alleenstaand;
            leefsituatieNL = "Alleenstaand";
            break;
        case "samenwonend":
            basisbedrag = AOW_BEDRAGEN_2024.samenwonend;
            leefsituatieNL = "Samenwonend/gehuwd";
            break;
        case "alleenstaand_met_kind":
            basisbedrag = AOW_BEDRAGEN_2024.alleenstaandMetKind;
            leefsituatieNL = "Alleenstaand met kind";
            break;
        default:
            basisbedrag = AOW_BEDRAGEN_2024.alleenstaand;
            leefsituatieNL = "Alleenstaand";
    }
    // AOW-korting bij minder dan 50 opbouwjaren (2% per jaar)
    const opbouwPercentage = Math.min(opbouwjaren * 2, 100);
    const brutoBedragMaand = basisbedrag * (opbouwPercentage / 100);
    const brutoBedragJaar = brutoBedragMaand * 12;
    // Schatting netto (indicatief, afhankelijk van andere inkomsten)
    const nettoBedragMaand = brutoBedragMaand * 0.85; // Ruwe schatting
    return `
📊 AOW-uitkering Berekening
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Leefsituatie:              ${leefsituatieNL}
AOW-opbouwjaren:           ${opbouwjaren} jaar (${opbouwPercentage}%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Volledig AOW (100%):       €${basisbedrag.toFixed(2)}/maand
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JOUW AOW BRUTO:
  Per maand:               €${brutoBedragMaand.toFixed(2)}
  Per jaar:                €${brutoBedragJaar.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Geschat netto (indicatief): €${nettoBedragMaand.toFixed(2)}/maand

📅 Bedragen zijn gebaseerd op AOW-tarieven 2024.
ℹ️ Het netto bedrag is indicatief en afhankelijk van je totale situatie.
`.trim();
}
async function handleCalculateJaarruimte(args) {
    const { bruto_jaarinkomen, factor_a = 0, pensioenopbouw_werkgever = 0 } = args;
    const result = berekenJaarruimte(bruto_jaarinkomen, factor_a, pensioenopbouw_werkgever);
    return result.berekening + `

💡 Tips:
- De jaarruimte is het bedrag dat je fiscaal aftrekbaar kunt inleggen
- Je kunt dit gebruiken voor lijfrente, banksparen of beleggen
- Onbenutte jaarruimte van afgelopen 7 jaar kan je alsnog gebruiken (reserveringsruimte)
`;
}
async function handleCalculatePensionGap(args) {
    const { huidig_inkomen, verwacht_pensioen, gewenst_percentage = 70 } = args;
    const result = berekenPensioengat(huidig_inkomen, verwacht_pensioen, gewenst_percentage);
    return result.analyse;
}
async function handleCalculateRequiredSavings(args) {
    const { doelbedrag, jaren_tot_pensioen, verwacht_rendement = 4 } = args;
    const result = berekenBenodidgeInleg(doelbedrag, jaren_tot_pensioen, verwacht_rendement);
    return result.berekening;
}
async function handleCompareScenarios(args) {
    const { huidig_inkomen, huidige_leeftijd, pensioen_leeftijd, scenarios } = args;
    const formattedScenarios = scenarios.map(s => ({
        naam: s.naam,
        maandelijkseInleg: s.maandelijkse_inleg,
        verwachtRendement: s.verwacht_rendement,
    }));
    return vergelijkScenarios(huidig_inkomen, huidige_leeftijd, pensioen_leeftijd, formattedScenarios);
}
// =============================================================================
// SERVER SETUP
// =============================================================================
const server = new Server({
    name: "pensioen-calculator",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});
// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        let result;
        switch (name) {
            case "calculate_aow_age": {
                const validated = CalculateAOWAgeSchema.parse(args);
                result = await handleCalculateAOWAge(validated);
                break;
            }
            case "calculate_aow_amount": {
                const validated = CalculateAOWAmountSchema.parse(args);
                result = await handleCalculateAOWAmount(validated);
                break;
            }
            case "calculate_jaarruimte": {
                const validated = CalculateJaarruimteSchema.parse(args);
                result = await handleCalculateJaarruimte(validated);
                break;
            }
            case "calculate_pension_gap": {
                const validated = CalculatePensionGapSchema.parse(args);
                result = await handleCalculatePensionGap(validated);
                break;
            }
            case "calculate_required_savings": {
                const validated = CalculateRequiredSavingsSchema.parse(args);
                result = await handleCalculateRequiredSavings(validated);
                break;
            }
            case "compare_pension_scenarios": {
                const validated = CompareScenariosSchema.parse(args);
                result = await handleCompareScenarios(validated);
                break;
            }
            default:
                throw new Error(`Onbekende tool: ${name}. Beschikbare tools: ${tools.map(t => t.name).join(', ')}`);
        }
        return {
            content: [{ type: "text", text: result }],
        };
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const zodError = error;
            const errorMessages = zodError.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('\n');
            return {
                content: [{
                        type: "text",
                        text: `❌ Validatiefout:\n${errorMessages}\n\n💡 Tip: Controleer de parameters en probeer opnieuw.`
                    }],
                isError: true,
            };
        }
        return {
            content: [{
                    type: "text",
                    text: `❌ Fout: ${error instanceof Error ? error.message : 'Onbekende fout'}\n\n💡 Probeer het opnieuw of neem contact op voor ondersteuning.`
                }],
            isError: true,
        };
    }
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Pensioen Calculator MCP Server gestart");
}
main().catch(console.error);
//# sourceMappingURL=index.js.map