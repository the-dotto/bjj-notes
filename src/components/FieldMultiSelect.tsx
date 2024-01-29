import React, { KeyboardEventHandler, useState } from "react";

import { components, MultiValueRemoveProps } from "react-select";
import CreatableSelect from "react-select/creatable";
import { PropsForFormFields } from "~/interfaces/form";
import { FieldValues, useController } from "react-hook-form";
import { FormFieldControl } from "./FormFieldControl";

export function FieldMultiSelect<Fields extends FieldValues>({
  label,
  placeholder,
  isRequired,
  ...props
}: PropsForFormFields<Fields>) {
  const { field, fieldState } = useController(props);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        const value = [
          ...(field.value ?? []),
          { label: inputValue, value: inputValue },
        ];
        
        field.onChange({ target: { value } });

        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <FormFieldControl
      label={label}
      name={field.name}
      errorMessage={fieldState.error?.message}
    >
      <CreatableSelect
        name={field.name}
        components={{ DropdownIndicator: null, MultiValueRemove }}
        inputValue={inputValue}
        isMulti
        menuIsOpen={false}
        onChange={(value) => field.onChange({ target: { value } })}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? ""}
        value={field.value}
        ref={field.ref}
        onBlur={field.onBlur}
        isDisabled={field.disabled}
        isClearable={false}
        classNames={{
          control: () =>
            "border-2 border-gray-900 active:border-gray-950 focus:border-gray-950 rounded py-2 px-4",
          valueContainer: () => "flex flex-wrap items-center gap-1",
          multiValue: () => "flex m-0.5 rounded border-2 border-gray-900",
          multiValueLabel: () => "select-none",
          multiValueRemove: () =>
            "flex px-1.5 hover:bg-red-500/70 hover:text-red-900 transition-colors",
        }}
        styles={{
          control: () => ({}),
          input: () => ({}),
          valueContainer: () => ({}),
          placeholder: (base) => ({ ...base, margin: "0" }),
          multiValue: () => ({}),
          multiValueLabel: (base) => ({ ...base, padding: "0 2px" }),
          multiValueRemove: () => ({}),
        }}
      />
    </FormFieldControl>
  );
}

function MultiValueRemove<Option>(props: MultiValueRemoveProps<Option>) {
  return (
    <components.MultiValueRemove {...props}>
      <span className="leading-none">×</span>
    </components.MultiValueRemove>
  );
}
