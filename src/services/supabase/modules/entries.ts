import { Client } from '../interfaces'
import { TablesInsert } from '../interfaces/database';
import { DATE_SERVICE } from '~/services/dates';

export class ModuleEntries {
	public async listCurrentWeek(client: Client) {
		const auth = await client.auth.getUser();
		const dates = DATE_SERVICE.getCurrentWeekStartAndEnd();

		if (auth.error) return { success: false, error: auth.error };

		const { data, error } = await client
			.from('entries')
			.select()
			.eq('user_id', auth.data.user.id)
			.gte('date', dates.start.toISOString())
			.lte('date', dates.end.toISOString())
			.order('date', { ascending: false })

		if (error) return { success: false, error };

		return { success: true, data };
	}

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