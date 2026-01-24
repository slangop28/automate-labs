
import { createClient } from '@supabase/supabase-js';

// These environment variables will be set in Vercel or your local .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Supabase Config:', {
    url: supabaseUrl,
    keyLength: supabaseAnonKey?.length,
    keyStart: supabaseAnonKey?.substring(0, 5)
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
