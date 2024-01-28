import { PropsWithChildren } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SUPABASE_SERVICE } from "~/services/supabase";
import { Button } from "~/components/Button";

export default async function Page() {
  const cookieStore = cookies();
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
  const { data, error } = await SUPABASE_SERVICE.modules.userProfiles.get(client);

	console.info(data)

	if (error) {
		redirect('/error')
	};

  // const user = await SUPABASE_SERVICE.modules.userProfiles.get(
  //   client,
  //   data.user?.id ?? ""
  // );

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
    </>
  );

  // return <>{user.data?.name}</>;
}
