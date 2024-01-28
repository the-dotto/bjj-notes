'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SUPABASE_SERVICE } from "~/services/supabase";

export async function onLogOut() {
	const cookieStore = cookies();
	const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
	const { error } = await client.auth.signOut();

	if (!error) {
		redirect("/auth/login");
	}
};
