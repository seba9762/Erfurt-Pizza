// Supabase client utility for Netlify Functions
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
function getSupabaseClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }

    return createClient(supabaseUrl, supabaseKey);
}

module.exports = { getSupabaseClient };
