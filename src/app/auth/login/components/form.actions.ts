'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SUPABASE_SERVICE } from "~/services/supabase";

export interface Fields {
	email: string;
	password: string;
}

export async function onFormSubmit(fields: Fields) {
	const cookieStore = cookies();
	const client = SUPABASE_SERVICE.clients.forServerActions(cookieStore);
	const { error } = await client.auth.signInWithPassword(fields);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/app", "layout");
	redirect("/app");
}