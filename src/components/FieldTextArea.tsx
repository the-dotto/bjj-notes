import { PropsForFormFields } from "~/interfaces/form";
import { useController, FieldValues } from "react-hook-form";
import { FormFieldControl } from "./FormFieldControl";

interface Props<Fields extends FieldValues> extends PropsForFormFields<Fields> {
  type: "text" | "email" | "password";
}

export function FieldTextArea<Fields extends FieldValues>({
  label,
  type,
  placeholder,
  isRequired = false,
  ...props
}: Props<Fields>) {
  const { field, fieldState } = useController(props);

  return (
    <FormFieldControl
      label={label}
      name={field.name}
      errorMessage={fieldState?.error?.message}
    >
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
    </FormFieldControl>
  );
}
