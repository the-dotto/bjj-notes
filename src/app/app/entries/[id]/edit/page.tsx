import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SUPABASE_SERVICE } from "~/services/supabase";
import { Form } from "./_components/Form";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const cookieStore = cookies();
  const client = SUPABASE_SERVICE.clients.forServer(cookieStore);

  const { data, error } = await SUPABASE_SERVICE.modules.entries.findById(
    client,
    params.id
  );

  if (data && !error) {
    return <Form entry={data} />;
  }

  if (!error && !data) {
    notFound();
  }

  return <></>;
}
