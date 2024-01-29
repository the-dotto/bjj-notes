"use client";

import { PropsWithChildren, forwardRef, MouseEventHandler } from "react";
import { PropsWithClassName } from "~/interfaces/utilities";
import cx from "classnames";

interface Props extends PropsWithChildren, PropsWithClassName {
  active: boolean;
  reversed?: boolean;
  onMouseDown?: MouseEventHandler<HTMLSpanElement>;
}

export const Button = forwardRef<HTMLSpanElement, Props>(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx("p-2 cursor-pointer transition-colors border-2 border-gray-900 rounded-md", {
        "text-white bg-gray-900": active,
      })}
    />
  )
);

Button.displayName = "Button";
