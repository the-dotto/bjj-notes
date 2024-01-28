import { createClient } from '@supabase/supabase-js'
import { Database } from './interfaces/database';
import { ENV } from '~/constants/environment';
import { ModuleAuth } from './modules/auth'
import { ModuleUsers } from './modules/user';
import { ModuleEntries } from './modules/entries';

class SupabaseService {
	private readonly client = createClient<Database>(ENV.supabase.url, ENV.supabase.key);

	public readonly auth = new ModuleAuth(this.client);
	public readonly users = new ModuleUsers(this.client);
	public readonly entries = new ModuleEntries(this.client);
};

export const SUPABASE_SERVICE = new SupabaseService();