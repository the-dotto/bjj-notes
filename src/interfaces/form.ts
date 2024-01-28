import { UseControllerProps, FieldValues } from "react-hook-form";

export interface PropsForFormFields<Fields extends FieldValues> extends UseControllerProps<Fields> {
	label: string;
	isRequired?: boolean;
	placeholder?: string;
}