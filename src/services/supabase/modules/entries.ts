import { Client } from '../interfaces'
import { TablesInsert } from '../interfaces/database';

export class ModuleEntries {
	public async create(client: Client, dto: TablesInsert<'entries'>) {
		const { data, error } = await client
			.from('entries')
			.insert(dto)
			.select()
			.limit(1)

		if (error) return { success: false, error };

		return { success: true, data: data.at(0)! };
	}
}