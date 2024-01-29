import { PropsForFormFields } from "~/interfaces/form";
import { FieldValues, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FormFieldControl } from "./FormFieldControl";

export function FieldDate<Fields extends FieldValues>({
  label,
  isRequired,
  placeholder,
  ...props
}: PropsForFormFields<Fields>) {
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => (
        <FormFieldControl
          label={label}
          name={field.name}
          errorMessage={fieldState?.error?.message}
        >
          <DatePicker
            placeholderText={placeholder}
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            className="border-2 border-gray-900 active:border-gray-950 focus:border-gray-950 rounded py-2 px-4"
            ref={field.ref}
            onBlur={field.onBlur}
          />
        </FormFieldControl>
      )}
    />
  );
}
