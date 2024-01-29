import { WeekOverview } from "~/components/WeekOverview";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SUPABASE_SERVICE } from "~/services/supabase";
import { ButtonAddEntry } from "~/components/ButtonAddEntry";

export default async function Page() {
  const cookieStore = cookies();
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
  const { data, error } =
    await SUPABASE_SERVICE.modules.entries.listCurrentWeek(client);

  if (error) {
    redirect("/app/error");
  }

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>

      <WeekOverview entries={data} />

      <ButtonAddEntry />
    </>
  );
}
