import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SUPABASE_SERVICE } from "~/services/supabase";
import { Form } from "./components/Form";

export default async function Page() {
  const cookieStore = cookies();
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
  const { data, error } = await client.auth.getUser();

  if (!error || data?.user) {
    redirect("/app");
  }

  return (
    <>
      <h1 className="text-4xl font-bold">Login</h1>

      <Form />
    </>
  );
}
