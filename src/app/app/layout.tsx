import { PropsWithChildren } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SUPABASE_SERVICE } from "~/services/supabase";
import styles from "./styles.module.css";
import { DATE_SERVICE } from "~/services/dates";
import { HeaderLink } from "~/components/HeaderLink";
import Link from "next/link";

export default async function Layout({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
  const { data, error } = await client.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="grid place-items-center h-screen overflow-hidden py-8">
      <div className={styles["layout-container"]}>
        <header className="flex justify-between px-4 items-center border-b-2 border-b-gray-900 select-none">
          <div className="flex gap-2 items-center py-2 ">
            <h2 className="text-2xl font-bold">BJJ Notes</h2>

            <span className="block text-gray-700 font-light">/</span>

            <span className="block text-gray-700 font-light">
              {DATE_SERVICE.getCurrentDateForDisplay()}
            </span>
          </div>

          <nav className="flex items-center h-full">
            <HeaderLink href="/app">Dashboard</HeaderLink>

            <HeaderLink href="/app/settings">Settings</HeaderLink>

            <HeaderLink href="/auth/logout" isLastItem>
              Log Out
            </HeaderLink>
          </nav>
        </header>

        <main className="h-full w-full overflow-y-auto p-4 flex flex-col gap-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
