# 🏦 Pensioen Calculator MCP Server

Een MCP (Model Context Protocol) server voor Nederlandse pensioenberekeningen. Deze server stelt AI-assistenten zoals Claude in staat om accurate pensioenberekeningen uit te voeren.

## 📋 Beschikbare Tools

| Tool | Beschrijving |
|------|-------------|
| `calculate_aow_age` | Bereken AOW-leeftijd op basis van geboortejaar |
| `calculate_aow_amount` | Bereken verwachte AOW-uitkering |
| `calculate_jaarruimte` | Bereken fiscale jaarruimte voor lijfrente |
| `calculate_pension_gap` | Analyseer het pensioengat |
| `calculate_required_savings` | Bereken benodigde maandelijkse inleg |
| `compare_pension_scenarios` | Vergelijk verschillende pensioen scenario's |

## 🚀 Installatie

### 1. Build de server

```bash
cd mcp-server
npm install
npm run build
```

### 2. Configureer Claude Desktop

Voeg toe aan `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pensioen-calculator": {
      "command": "node",
      "args": ["/Users/arshamsharafat/Downloads/project 2/mcp-server/dist/index.js"]
    }
  }
}
```

### 3. Herstart Claude Desktop

Na het toevoegen van de configuratie, herstart Claude Desktop om de MCP server te laden.

## 💡 Voorbeelden

### AOW-leeftijd berekenen
```
Bereken mijn AOW-leeftijd als ik geboren ben in 1985.
```

### Jaarruimte berekenen
```
Ik verdien €60.000 per jaar als ZZP'er. Hoeveel jaarruimte heb ik?
```

### Pensioengat analyseren
```
Mijn huidige inkomen is €55.000. Ik verwacht €25.000 pensioen per jaar.
Analyseer mijn pensioengat.
```

### Scenario's vergelijken
```
Vergelijk 3 scenario's:
1. €200/maand met 4% rendement
2. €300/maand met 4% rendement  
3. €300/maand met 6% rendement

Ik ben 35 jaar en wil met 67 stoppen.
```

## 📊 Ondersteunde Berekeningen

### AOW (Algemene Ouderdomswet)
- AOW-leeftijd per geboortejaar (actuele tabel)
- AOW-bedragen voor alleenstaanden en samenwonenden
- Korting bij minder dan 50 opbouwjaren

### Jaarruimte
- Premiegrondslag berekening
- AOW-franchise aftrek
- Factor A correctie voor werkgeverpensioen
- Maximum premiegrondslag

### Pensioengat
- Dekkingsgraad berekening
- Risico-analyse (laag/matig/hoog)
- Advies op basis van situatie

### Vermogensopbouw
- Compound interest berekeningen
- Scenario vergelijkingen
- 4% onttrekkingsregel schatting

## ⚠️ Disclaimer

Deze tool is bedoeld voor indicatieve berekeningen en informatie. De resultaten zijn geen persoonlijk financieel advies. Raadpleeg altijd een gekwalificeerd pensioenadviseur voor advies op maat.

**MijnPensioenGevuld.nl** - AFM-geregistreerd pensioenadviseur

## 📄 Licentie

MIT License - © 2024 MijnPensioenGevuld.nl
