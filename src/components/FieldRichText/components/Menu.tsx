import { forwardRef, PropsWithChildren } from "react";
import { PropsWithClassName } from "~/interfaces/utilities";
import cx from "classnames";
import { css } from "@emotion/css";

interface Props extends PropsWithChildren, PropsWithClassName {}

export const Menu = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
);

Menu.displayName = "Menu";
