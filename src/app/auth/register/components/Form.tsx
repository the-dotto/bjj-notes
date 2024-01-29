"use client";

import { z } from "zod";
import { FieldInput } from "~/components/FieldInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/Button";
import { ButtonLink } from "~/components/ButtonLink";
import { onFormSubmit, Fields } from "./form.actions";

const SCHEMA = z.object({
  email: z.string().email(),
  name: z.string().min(2),
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
          alwaysFullWidth
        />

        <FieldInput
          label="Name"
          type="text"
          name="name"
          control={form.control}
          isRequired
          alwaysFullWidth
        />

        <FieldInput
          label="Password"
          type="password"
          name="password"
          control={form.control}
          isRequired
          alwaysFullWidth
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit">Register</Button>

        <ButtonLink href="/auth/login" isOutlined>
          Login
        </ButtonLink>
      </div>
    </form>
  );
}
