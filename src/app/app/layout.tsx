import { PropsWithChildren } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SUPABASE_SERVICE } from "~/services/supabase";
import styles from "./styles.module.css";
import { DATE_SERVICE } from "~/services/dates";

export default async function Layout({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
  const { data, error } = await client.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="grid place-items-center h-screen overflow-hidden py-8">
      <div className={styles["content"]}>
        <header className="flex justify-between py-2 px-4 items-center border-b-2 border-b-gray-900">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-bold">BJJ Notes</h2>

            <span className="block text-gray-700 font-light">/</span>

            <span className="block text-gray-700 font-light">
              {DATE_SERVICE.getCurrentDateForDisplay()}
            </span>
          </div>
        </header>

        <main className="h-full w-full overflow-y-auto px-4 py-2">
          {children}
        </main>
      </div>
    </div>
  );
}
