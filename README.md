# MijnPensioenGevuld.nl

Een Next.js website voor pensioenadvies.

## Installatie

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuratie

1. Kopieer `.env.example` naar `.env.local`
2. Vul de configuratie in `config/site.ts` aan met je bedrijfsgegevens
3. Configureer e-mail via Resend of SMTP

## Structuur

```
├── app/                    # Next.js App Router
│   ├── api/contact/        # Contact form API
│   ├── kennisbank/         # Kennisbank pagina's
│   ├── privacy/            # Privacy pagina
│   ├── cookies/            # Cookie pagina
│   └── voorwaarden/        # Voorwaarden pagina
├── components/             # React componenten
│   ├── sections/           # Pagina secties
│   └── ui/                 # UI componenten
├── config/                 # Configuratie
├── content/                # Content (testimonials, FAQs, artikelen)
├── lib/                    # Utilities
└── types/                  # TypeScript types
```

## Logo's

Plaats je logo's in de `/public` folder:
- `logo-mijnpensioen.png` - Volledige logo
- `pig_only.png` - Alleen het spaarvarkentje

Update daarna de Logo component in `components/ui/Logo.tsx` om de afbeeldingen te gebruiken.

## Productie

```bash
npm run build
npm start
```

## Compliance

- AFM-nummer: 12016626 (via Financieel Zeker)
- Update `config/site.ts` met je KvK-nummer en bedrijfsnaam
