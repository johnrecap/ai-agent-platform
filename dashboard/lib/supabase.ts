import { createClient } from '@supabase/supabase-js';

// NOTE: You must create a project at https://supabase.com
// Then add these values to a .env file or replace them here directly
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to check if Supabase is actually configured
export const isSupabaseConfigured = () => {
    return supabaseUrl !== 'https://your-project.supabase.co' && supabaseKey !== 'your-anon-key';
};