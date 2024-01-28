import { Client } from '../interfaces'
import { Tables } from '../interfaces/database';

export class ModuleUserProfiles {
	/** Retrieves the profile of the logged user. */
	public async get(client: Client) {
		const { data, error } = await client
			.from('user_profiles')
			.select();

		if (error) return { success: false, error };

		return { success: true, data: data.at(0)! };
	}

	public async create(client: Client, dto: Tables<'user_profiles'>) {
		const { data, error } = await client
			.from('user_profiles')
			.insert(dto)
			.select()
			.limit(1)

		if (error) return { success: false, error };

		return { success: true, data: data.at(0)! };
	};
}