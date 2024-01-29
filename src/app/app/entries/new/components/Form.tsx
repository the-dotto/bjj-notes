"use client";

import { FieldRichText } from "~/components/FieldRichText";
import { useForm } from "react-hook-form";
import { Descendant } from "slate";

export function Form() {
  const form = useForm<{ content: Descendant[] }>();

  return (
    <form>
      <FieldRichText name="content" control={form.control} />
    </form>
  );
}
