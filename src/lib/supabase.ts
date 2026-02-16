import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
    id: string;
    full_name: string | null;
    username: string | null;
    role: 'user' | 'admin' | 'mentor';
    business_about: string | null;
    business_level: string | null;
    team_size: number | null;
    updated_at: string;
}