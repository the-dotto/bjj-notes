import * as Label from "@radix-ui/react-label";
import cx from "classnames";
import { PropsWithChildren } from "react";
import { PropsWithClassName } from "~/interfaces/utilities";

interface Props extends PropsWithChildren, PropsWithClassName {
  name: string;
  label: string;
  errorMessage?: string;
  alwaysFullWidth?: boolean;
}

export function FormFieldControl({
  name,
  label,
  errorMessage,
  className,
  children,
  alwaysFullWidth = false,
}: Props) {
  return (
    <div
      className={cx(
        "flex flex-col gap-1 w-full",
        { "md:w-fit": !alwaysFullWidth },
        className
      )}
    >
      <Label.Root htmlFor={name} className="font-bold">
        {label}
      </Label.Root>

      {children}

      {errorMessage && <span className="text-red-700">{errorMessage}</span>}
    </div>
  );
}
