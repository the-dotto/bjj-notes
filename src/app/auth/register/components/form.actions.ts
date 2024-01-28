'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SUPABASE_SERVICE } from "~/services/supabase";

export interface Fields {
	email: string;
	name: string;
	password: string;
}

export async function onFormSubmit(fields: Fields) {
	const cookieStore = cookies();
	const client = SUPABASE_SERVICE.clients.forServerActions(cookieStore);
	const auth = await client.auth.signUp(fields);

	if (auth.error) {
		redirect("/error");
	};

	if (auth.data.user) {
		const { data } = await SUPABASE_SERVICE.modules.userProfiles.create(client, { id: auth.data.user.id, name: fields.name });

		if (data) {
			revalidatePath("/app", "layout");
			redirect("/app");
		}
	}
}