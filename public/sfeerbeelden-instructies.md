# Sfeerbeelden Instructies

De website bevat nu **3 placeholder plekken** voor sfeerbeelden. Vervang deze door echte foto's voor een professionele uitstraling.

## 📍 Locaties

### 1. Hero Sectie - "Van chaos naar inzicht"
**Locatie:** Rechts naast de inventarisatie-card op de homepage  
**Bestandsnaam:** `hero-chaos-to-clarity.jpg` (of `.png`)  
**Afmetingen:** Minimaal 800x600px (verhouding 4:3)  
**Stijl:** 
- Links: Stapel onbegrijpelijke pensioenbrieven/documenten (chaos)
- Rechts: Één duidelijk, geordend overzicht/dashboard (clarity)
- Of: Een "voor/na" visualisatie van verwarring → duidelijkheid
- **Geen personen** (merkneutraal)

**Prompt voor AI-generatie (Midjourney/DALL-E):**
```
"Split screen image: left side shows messy stack of confusing pension letters and documents, right side shows one clear organized financial overview dashboard, professional photography, clean modern style, no people"
```

---

### 2. Why Sectie - "Rustige pensioensfeer"
**Locatie:** Rechts naast de "Het goede nieuws" box  
**Bestandsnaam:** `why-peaceful-retirement.jpg`  
**Afmetingen:** Minimaal 800x600px (verhouding 4:3)  
**Stijl:**
- Abstracte sfeer van rust en zorgeloosheid
- Bijvoorbeeld: Koffie op tafel in de tuin (zonder personen), wandeling op het strand (van achteren), rustige natuur
- Warme, zachte kleuren (oranjegoud tinten passen bij je brand)
- **Geen personen** (merkneutraal)

**Prompt voor AI-generatie:**
```
"Peaceful retirement atmosphere: coffee cup on wooden table in sunny garden, soft morning light, warm orange-gold tones, serene and calm, no people, professional photography, shallow depth of field"
```

---

### 3. Conversation Sectie - "Zelfverzekerde toekomst"
**Locatie:** Onder de gespreksonderwerpen lijst  
**Bestandsnaam:** `conversation-confident-future.jpg`  
**Afmetingen:** Minimaal 1200x400px (breed formaat, verhouding 3:1)  
**Stijl:**
- Abstract beeld van vertrouwen en duidelijkheid
- Bijvoorbeeld: Horizon met opkomende zon, heldere lucht, abstracte geometrische vormen die "groei" suggereren
- Professioneel, modern, positief
- **Geen personen** (merkneutraal)

**Prompt voor AI-generatie:**
```
"Confident future abstract image: horizon with rising sun, clear sky, warm orange and gold gradient, modern minimalist style, sense of growth and clarity, no people, professional photography"
```

---

## 🎨 Algemene Richtlijnen

- **Kleuren:** Pas bij je brand (oranje/amber tinten)
- **Stijl:** Modern, professioneel, warm
- **Geen personen:** Merkneutraal (Financieel Zeker-stijl)
- **Formaat:** JPG of PNG, geoptimaliseerd voor web (< 500KB per foto)
- **Responsive:** Zorg dat foto's goed werken op mobiel én desktop

## 📝 Implementatie

1. Plaats de foto's in `/public/`
2. Update `app/page.tsx` en vervang de `placeholder` prop door `src`:
   ```tsx
   <AtmosphereImage 
     src="/hero-chaos-to-clarity.jpg"
     alt="Van onbegrijpelijke pensioenbrieven naar duidelijk overzicht"
     className="h-64 lg:h-80"
   />
   ```

## 🔄 Alternatief: Stockfoto's

Als je geen AI-generatie wilt gebruiken, kijk naar:
- **Unsplash:** Zoek op "financial planning", "retirement planning", "organized documents"
- **Pexels:** Zoek op "peaceful retirement", "financial clarity"
- **Pixabay:** Gratis stockfoto's met commerciële licentie

Filter op: **Geen personen**, **Warme kleuren**, **Professioneel**
