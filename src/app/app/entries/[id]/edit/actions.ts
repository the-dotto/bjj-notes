'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SUPABASE_SERVICE } from "~/services/supabase";
import { Tables } from "~/services/supabase/interfaces/database";

export interface Fields extends Pick<Tables<'entries'>, 'content' | 'title'> {
	date: Date;
	tags: { label: string; value: string }[];
}

export async function onFormSubmit(id: string | number, fields: Fields) {
	const cookieStore = cookies();
	const client = SUPABASE_SERVICE.clients.forServerActions(cookieStore);
	const auth = await client.auth.getUser();

	if (auth.error) {
		redirect("/error");
	};

	if (auth.data?.user?.id) {
		const date = new Date(fields.date).toISOString();;
		const tags = fields.tags.map(tag => tag.value);
		const entry = await SUPABASE_SERVICE.modules.entries.update(client, id, { ...fields, date, tags });

		if (entry.error) {
			redirect(`/app/entries/${id}/error`);
		};

		revalidatePath(`/app/entries/${id}`, 'page');
		redirect(`/app/entries/${id}`);
	}
}