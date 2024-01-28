import { SupabaseClient } from '@supabase/supabase-js'
import { Client } from '../interfaces'

export class ModuleAuth {
	private client: SupabaseClient

	constructor(client: Client) {
		this.client = client
	};

	public async signUp(params: { email: string; password: string }) {
		try {
			const { data, error } = await this.client.auth.signUp({ email: params.email, password: params.password });
			if (error) throw error;

			return data;
		} catch (error) {
			return error;
		}
	};

	public async signIn(params: { email: string; password: string; }) {
		try {
			const { data, error } = await this.client.auth.signInWithPassword(params);
			if (error) throw error;

			return data;
		} catch (error) {
			return error;
		}
	};
}