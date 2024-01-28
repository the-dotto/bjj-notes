import { PropsForFormFields } from "~/interfaces/form";
import { useController, FieldValues } from "react-hook-form";
import * as Label from "@radix-ui/react-label";

interface Props<Fields extends FieldValues> extends PropsForFormFields<Fields> {
  type: "text" | "email" | "password";
}

export function FieldTextArea<Fields extends FieldValues>({
  type,
  placeholder,
  isRequired = false,
  ...props
}: Props<Fields>) {
  const { field, fieldState } = useController(props);

  return (
    <div className="flex flex-col gap-2">
      <Label.Root htmlFor={field.name}></Label.Root>

      <textarea
        id={field.name}
        ref={field.ref}
        name={field.name}
        onChange={field.onChange}
        value={field.value}
        onBlur={field.onBlur}
        placeholder={placeholder}
        required={isRequired}
        disabled={field.disabled}
      />

      {fieldState?.error && (
        <span className="text-red-700">{fieldState.error.message}</span>
      )}
    </div>
  );
}
