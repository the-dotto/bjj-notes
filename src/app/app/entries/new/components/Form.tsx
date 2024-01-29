"use client";

import { FieldRichText } from "~/components/FieldRichText";
import { useForm } from "react-hook-form";
import { FieldDate } from "~/components/FieldDate";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldMultiSelect } from "~/components/FieldMultiSelect";
import { Button } from "~/components/Button";
import { Fields } from "./form.actions";
import { onFormSubmit } from "./form.actions";

const SCHEMA = z.object({
  content: z.array(z.any()),
  date: z.date(),
  tags: z.array(z.object({ label: z.string(), value: z.string() })),
});

export function Form() {
  const form = useForm<Fields>({
    resolver: zodResolver(SCHEMA),
    defaultValues: { date: new Date(), tags: [] },
  });

  function onSubmit(fields: Fields) {
    onFormSubmit(fields);
  }

  return (
    <form
      className="flex flex-col gap-6 h-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">New Entry</h1>

        <Button type="submit">Save</Button>
      </div>

      <div className="h-full flex flex-col gap-4 grow">
        <FieldDate label="Date" name="date" control={form.control} />

        <FieldMultiSelect label="Tags" name="tags" control={form.control} />

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
