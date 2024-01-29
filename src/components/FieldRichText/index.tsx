'use client';

import React, { useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import {
  UseControllerProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { INITIAL_VALUE } from "./constants";
import { PropsWithClassName } from "~/interfaces/utilities";
import { FormFieldControl } from "../FormFieldControl";
import cx from "classnames";

interface Props<Fields extends FieldValues>
  extends PropsWithClassName,
    UseControllerProps<Fields> {
  label: string;
}

export function FieldRichText<Fields extends FieldValues>({
  label,
  className,
  ...props
}: Props<Fields>) {
  const { field, fieldState } = useController(props);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <FormFieldControl
      label={label}
      name={field.name}
      errorMessage={fieldState?.error?.message}
      className={cx(className, "!w-full")}
    >
      <Slate
        editor={editor}
        initialValue={field.value ?? INITIAL_VALUE}
        onChange={(value) => field.onChange({ target: { value } })}
      >
        <Editable className="h-full focus:outline-none border-2 border-gray-900 active:border-gray-950 focus:border-gray-950 rounded py-2 px-4" />
      </Slate>
    </FormFieldControl>
  );
}

export function FieldRichTextReadOnly({ content }: { content: Descendant[] }) {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} initialValue={content}>
      <Editable
        readOnly
        className="h-full focus:outline-none border-2 border-gray-900 active:border-gray-950 focus:border-gray-950 rounded py-2 px-4"
      />
    </Slate>
  );
}
