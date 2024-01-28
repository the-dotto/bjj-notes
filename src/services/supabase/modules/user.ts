import { SupabaseClient } from '@supabase/supabase-js'
import { Client } from '../interfaces'

export class ModuleUsers {
	private client: SupabaseClient

	constructor(client: Client) {
		this.client = client
	};
}