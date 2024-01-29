'use client';

import { PropsWithChildren, forwardRef, MouseEventHandler } from "react";
import { PropsWithClassName } from "~/interfaces/utilities";
import cx from "classnames";
import { css } from "@emotion/css";

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
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  )
);
