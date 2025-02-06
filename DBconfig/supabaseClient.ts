import {createClient} from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppState } from 'react-native';


const url: string  = process.env.EXPO_PUBLIC_PROJECT_URL as string;
const key: string  = process.env.EXPO_PUBLIC_ANON_KEY as string;

const supabase = createClient(url, key,{
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});


AppState.addEventListener('change', (state) => {
    if(state == 'active') {supabase.auth.startAutoRefresh()}
    else supabase.auth.stopAutoRefresh
})

export default supabase;

