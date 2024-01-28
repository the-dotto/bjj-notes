"use client";

import { FieldInput } from "~/components/FieldInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/Button";
import { ButtonLink } from "~/components/ButtonLink";
import { onFormSubmit, Fields } from "./form.actions";

const SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function Form() {
  const form = useForm<Fields>({ resolver: zodResolver(SCHEMA) });

  function onSubmit(fields: Fields) {
    onFormSubmit(fields);
  }

  return (
    <form
      className="h-full w-full max-w-md overflow-y-auto flex flex-col justify-between gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <FieldInput
          label="E-Mail"
          type="email"
          name="email"
          control={form.control}
          isRequired
        />

        <FieldInput
          label="Password"
          type="password"
          name="password"
          control={form.control}
          isRequired
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit">Login</Button>

        <ButtonLink href="/auth/register" isOutlined>
          Register
        </ButtonLink>
      </div>
    </form>
  );
}
