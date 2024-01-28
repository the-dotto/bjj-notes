import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from './database';

export type Client = SupabaseClient<Database>;
