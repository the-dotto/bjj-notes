import { ButtonLink } from "~/components/ButtonLink";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SUPABASE_SERVICE } from "~/services/supabase";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);
  const { data, error } = await client.auth.getUser();

  if (!error && data?.user) {
    redirect("/app");
  }

  return (
    <div className="grid place-items-center h-dvh overflow-hidden max-md:p-2 md:py-8">
      <main className="container mx-auto border-2 border-gray-900 h-full rounded-md py-4 flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-center px-4 border-b-2 border-b-gray-900 pb-4">
          BJJ Notes
        </h2>

        <p className="px-4 border-b-2 border-b-gray-900 pb-4 grow">
          BJJ Notes is a simple app that allows you to keep track of your BJJ
          training.
        </p>

        <nav className="flex justify-center gap-4 items-center pb-4 border-b-2 border-b-gray-900 px-4">
          <ButtonLink href="/auth/login">Login</ButtonLink>

          <ButtonLink href="/auth/register">Register</ButtonLink>
        </nav>

        <footer className="px-4">
          Made by{" "}
          <Link
            href="https://www.instagram.com/reinny.almonte/"
            target="_blank"
            className="underline"
          >
            @reinny.almonte
          </Link>
        </footer>
      </main>
    </div>
  );
}
