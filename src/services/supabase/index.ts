import { ModuleUserProfiles } from './modules/user-profiles';
import { ModuleEntries } from './modules/entries';
import { Clients } from './clients';

class SupabaseService {
	public readonly clients = new Clients();

	public readonly modules = {
		userProfiles: new ModuleUserProfiles(),
		entries: new ModuleEntries()
	};
};

export const SUPABASE_SERVICE = new SupabaseService();

export { type Tables } from './interfaces/database';