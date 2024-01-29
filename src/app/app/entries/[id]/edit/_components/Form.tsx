"use client";

import { FieldRichText } from "~/components/FieldRichText";
import { useForm } from "react-hook-form";
import { FieldDate } from "~/components/FieldDate";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldMultiSelect } from "~/components/FieldMultiSelect";
import { Button } from "~/components/Button";
import { Fields, onFormSubmit } from "../actions";
import { FieldInput } from "~/components/FieldInput";
import { Tables } from "~/services/supabase";
import { DATE_SERVICE } from "~/services/dates";

interface Props {
  entry: Tables<"entries">;
}

const SCHEMA = z.object({
  title: z.string(),
  content: z.array(z.any()),
  date: z.date(),
  tags: z.array(z.object({ label: z.string(), value: z.string() })),
});

export function Form({ entry }: Props) {
  const form = useForm<Fields>({
    resolver: zodResolver(SCHEMA),
    defaultValues: {
      title: entry.title,
      date: DATE_SERVICE.toDate(entry.date),
      tags: entry?.tags?.map((tag) => ({ label: tag, value: tag })),
      content: entry.content,
    },
  });

  function onSubmit(fields: Fields) {
    onFormSubmit(entry.id, fields);
  }

  return (
    <form
      className="flex flex-col gap-6 h-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Edit Entry</h1>

        <Button type="submit">Update</Button>
      </div>

      <div className="h-full flex flex-col gap-4 grow">
        <div className="flex md:flex-row gap-4 flex-col">
          <FieldInput
            label="Title"
            name="title"
            type="text"
            control={form.control}
            isRequired
          />

          <FieldDate
            label="Date"
            name="date"
            control={form.control}
            isRequired
          />

          <FieldMultiSelect
            label="Tags"
            name="tags"
            control={form.control}
            isRequired
          />
        </div>

        <FieldRichText
          label="Content"
          name="content"
          control={form.control}
          className="grow"
        />
      </div>
    </form>
  );
}
