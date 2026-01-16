import { createClient } from "@supabase/supabase-js";

// Client-side Supabase client (limited access)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Server-side Supabase client (full access - use only in API routes)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Types for database tables
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  status: "new" | "contacted" | "converted" | "lost";
  created_at: string;
  updated_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: "active" | "unsubscribed";
  subscribed_at: string;
  unsubscribed_at?: string;
}

export interface EmailCampaign {
  id: string;
  subject: string;
  content: string;
  status: "draft" | "sent";
  sent_count: number;
  created_at: string;
  sent_at?: string;
}
