import { Client } from '../interfaces'
import { TablesInsert, TablesUpdate } from '../interfaces/database';
import { DATE_SERVICE } from '~/services/dates';

export class ModuleEntries {
	/** Doesn't return the `content` field. */
	public async list(client: Client) {
		const auth = await client.auth.getUser();

		if (auth.error) return { success: false, error: auth.error };

		const { data, error } = await client
			.from('entries')
			.select('id, title, date, tags')
			.eq('user_id', auth.data.user.id)
			.order('date', { ascending: true })

		if (error) return { success: false, error };

		return { success: true, data };
	}

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
			.order('date', { ascending: true })

		if (error) return { success: false, error };

		return { success: true, data };
	}

	public async findById(client: Client, id: string) {
		const auth = await client.auth.getUser();

		if (auth.error) return { success: false, error: auth.error };

		const { data, error } = await client
			.from('entries')
			.select()
			.eq('user_id', auth.data.user.id)
			.eq('id', id)
			.limit(1)

		if (error) return { success: false, error };

		return { success: true, data: data.at(0)! };
	}

	public async update(client: Client, id: string | number, dto: TablesUpdate<'entries'>) {
		const { data, error } = await client
			.from('entries')
			.update(dto)
			.eq('id', id)
			.select()

		if (error) return { success: false, error };

		return { success: true, data: data.at(0)! };
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