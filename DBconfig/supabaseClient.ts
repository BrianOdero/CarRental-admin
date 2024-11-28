import {createClient} from '@supabase/supabase-js'

const url: string  = process.env.EXPO_PUBLIC_PROJECT_URL as string;
const key: string  = process.env.EXPO_PUBLIC_ANON_KEY as string;

const supabase = createClient(url, key);

export default supabase