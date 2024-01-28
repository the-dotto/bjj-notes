import { SupabaseClient } from '@supabase/supabase-js'
import { Client } from '../interfaces'

export class ModuleEntries {
	private client: SupabaseClient

	constructor(client: Client) {
		this.client = client
	};
}