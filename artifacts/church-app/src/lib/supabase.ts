import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = "admin" | "leader" | "member";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date_label: string;
  pinned: boolean;
  created_at: string;
}

export interface PrayerRequest {
  id: number;
  name: string;
  request: string;
  status: "pending" | "prayed";
  created_at: string;
}

export interface Sermon {
  id: number;
  title: string;
  date_label: string;
  duration: string;
  youtube_url: string;
  created_at: string;
}
