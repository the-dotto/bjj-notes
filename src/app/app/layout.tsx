import { PropsWithChildren } from "react";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SUPABASE_SERVICE } from "~/services/supabase";

export default async function Layout({ children }: PropsWithChildren) {
	const cookieStore = cookies()
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
  const { data, error } = await client.auth.getUser();

	if (error || !data?.user) {
    redirect('/auth/login')
  }
	
  return (
    <div className="grid place-items-center h-screen overflow-hidden">
      <main className="container mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
