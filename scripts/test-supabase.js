
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from parent directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Testing Connection to:', url);

if (!url || !key) {
    console.error('ERROR: Missing keys in .env');
    process.exit(1);
}

const supabase = createClient(url, key);

async function testConnection() {
    console.log('Attempting to insert test record into callbacks...');

    // Testing specific REST endpoint equivalent via SDK
    const { data, error } = await supabase
        .from('callbacks')
        .insert([{
            name: 'Test Script',
            phone: '0000000000',
            email: 'test@example.com',
            query: 'NodeJS Test'
        }]);

    if (error) {
        console.error('❌ CONNECTION FAILED:', error.message);
        console.error('Details:', error);
    } else {
        console.log('✅ SUCCESS! Connected and inserted data.');
    }
}

testConnection();
