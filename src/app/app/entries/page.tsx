import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SUPABASE_SERVICE } from "~/services/supabase";
import { ButtonAddEntry } from "~/components/ButtonAddEntry";
import { DATE_SERVICE } from "~/services/dates";
import { Chip } from "~/components/Chip";
import Link from "next/link";

export default async function Page() {
  const cookieStore = cookies();
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
  const { data, error } = await SUPABASE_SERVICE.modules.entries.list(client);

  if (error) {
    redirect("/app/error");
  }

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">Entries</h1>
      </div>

      <ul className="flex flex-col gap-4">
        {data.map((entry) => (
          <li key={entry.id} className="flex rounded border-2 border-gray-900">
            <div className="grow flex flex-col pl-4 py-2 gap-2 select-none">
              <div className="flex flex-col">
                <h4>{DATE_SERVICE.format("timestamp", entry.date)}</h4>
                <h3 className="text-xl font-bold line-clamp-1">
                  {entry.title}
                </h3>
              </div>

              <ul className="flex flex-nowrap gap-2">
                {entry.tags?.map((tag, index) => (
                  <Chip key={index}>{tag}</Chip>
                ))}
              </ul>
            </div>

            <Link
              href={`/app/entries/${entry.id}`}
              className="px-12 text-2xl py-2 grid place-items-center border-l-2 border-l-gray-900 transition-colors hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white active:bg-gray-900 active:text-white"
            >
              &#8658;
            </Link>
          </li>
        ))}
      </ul>

      <ButtonAddEntry />
    </>
  );
}
