import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SUPABASE_SERVICE } from "~/services/supabase";
import { DATE_SERVICE } from "~/services/dates";
import { Chip } from "~/components/Chip";
import { ButtonLink } from "~/components/ButtonLink";
import { FieldRichTextReadOnly } from "~/components/FieldRichText";
import { Descendant } from "slate";

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

  if (!error && !data) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{data?.title}</h1>

        <ButtonLink href={`/app/entries/${params.id}/edit`}>Edit</ButtonLink>
      </div>

      <div className="h-full flex flex-col gap-4 grow">
        <div className="flex md:flex-row gap-4 flex-col">
          <div className="flex flex-col gap-1 w-full">
            <span className="font-bold">Date</span>
            <span>{DATE_SERVICE.format("timestamp", data?.date)}</span>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <span className="font-bold">Tags</span>

            <ul className="flex flex-nowrap gap-2">
              {data?.tags?.map((tag, index) => (
                <Chip key={index}>{tag}</Chip>
              ))}
            </ul>
          </div>
        </div>

        <FieldRichTextReadOnly
          content={(data?.content ?? []) as Descendant[]}
        />
      </div>
    </div>
  );
}
