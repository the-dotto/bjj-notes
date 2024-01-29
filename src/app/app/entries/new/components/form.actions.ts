'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SUPABASE_SERVICE } from "~/services/supabase";
import { Tables } from "~/services/supabase/interfaces/database";

export interface Fields extends Pick<Tables<'entries'>, 'content'> {
	date: Date;
	tags: { label: string; value: string }[];
}

export async function onFormSubmit(fields: Fields) {
	const cookieStore = cookies();
	const client = SUPABASE_SERVICE.clients.forServerActions(cookieStore);
	const auth = await client.auth.getUser();

	if (auth.error) {
		redirect("/error");
	};

	if (auth.data?.user?.id) {
		const date = new Date(fields.date).toISOString();;
		const tags = fields.tags.map(tag => tag.value);
		const entry = await SUPABASE_SERVICE.modules.entries.create(client, { ...fields, date, tags, 'user_id': auth.data?.user?.id });

		if (entry.error) {
			redirect("/error");
		};

		revalidatePath("/app", 'layout');
		redirect("/app");
	}
}