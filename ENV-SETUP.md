# Environment Variables Setup

Maak een bestand `.env.local` in de root van je project met de volgende variabelen:

```bash
# ===========================================
# MIJNPENSIOENGEVULD - Environment Variables
# ===========================================

# -------------------------------------------
# SUPABASE (Database)
# -------------------------------------------
# Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# -------------------------------------------
# RESEND (Email API)
# -------------------------------------------
# Get this from: https://resend.com/api-keys
RESEND_API_KEY=re_your-api-key-here

# Email settings
EMAIL_FROM=MijnPensioenGevuld <noreply@mijnpensioengevuld.nl>

# -------------------------------------------
# GOOGLE ANALYTICS
# -------------------------------------------
# Get this from: https://analytics.google.com/ -> Admin -> Data Streams
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# -------------------------------------------
# ADMIN DASHBOARD
# -------------------------------------------
# Set a secure password for admin access
ADMIN_PASSWORD=your-secure-admin-password-here
```

## Setup Stappen

### 1. Supabase Database

1. Ga naar [supabase.com](https://supabase.com) en maak een account
2. Maak een nieuw project aan
3. Ga naar Settings → API en kopieer:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

4. Ga naar SQL Editor en voer dit uit:

```sql
-- Leads tabel (contactaanvragen)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscribers tabel (mailinglijst)
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Email campaigns tabel
CREATE TABLE email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  sent_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;

-- Policies voor service role (admin)
CREATE POLICY "Service role full access to leads" ON leads FOR ALL USING (true);
CREATE POLICY "Service role full access to subscribers" ON subscribers FOR ALL USING (true);
CREATE POLICY "Service role full access to email_campaigns" ON email_campaigns FOR ALL USING (true);
```

### 2. Resend Email API

1. Ga naar [resend.com](https://resend.com) en maak een account
2. Ga naar API Keys en maak een nieuwe key
3. Kopieer de key → `RESEND_API_KEY`
4. Voeg je domein toe (optioneel maar aanbevolen voor betere deliverability)

### 3. Google Analytics

1. Ga naar [analytics.google.com](https://analytics.google.com)
2. Maak een property aan voor je website
3. Ga naar Admin → Data Streams → Web
4. Kopieer de Measurement ID (G-XXXXXXXXXX) → `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 4. Admin Wachtwoord

Kies een sterk wachtwoord voor je admin dashboard → `ADMIN_PASSWORD`
