import { PropsForFormFields } from "~/interfaces/form";
import { useController, FieldValues } from "react-hook-form";
import { FormFieldControl } from "./FormFieldControl";

interface Props<Fields extends FieldValues> extends PropsForFormFields<Fields> {
  autoComplete?: false;
  type: "text" | "email" | "password";
}

export function FieldInput<Fields extends FieldValues>({
  label,
  type,
  placeholder,
  isRequired = false,
  autoComplete = false,
  ...props
}: Props<Fields>) {
  const { field, fieldState } = useController(props);

  return (
    <FormFieldControl
      label={label}
      name={field.name}
      errorMessage={fieldState?.error?.message}
    >
      <input
        id={field.name}
        ref={field.ref}
        name={field.name}
        onChange={field.onChange}
        value={field.value}
        onBlur={field.onBlur}
        type={type}
        placeholder={placeholder}
        required={isRequired}
        disabled={field.disabled}
        className="border-2 border-gray-900 active:border-gray-950 focus:border-gray-950 rounded py-2 px-4"
        autoComplete={autoComplete ? "on" : "off"}
      />
    </FormFieldControl>
  );
}
