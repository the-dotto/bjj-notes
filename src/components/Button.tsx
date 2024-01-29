import { PropsWithChildren, forwardRef } from "react";
import { PropsWithClassName } from "~/interfaces/utilities";
import cx from "classnames";

interface Props extends PropsWithChildren, PropsWithClassName {
  type?: "button" | "submit";
  onClick?: () => void;
  isOutlined?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ type, onClick, children, isOutlined = false }, ref) => {
    return (
      <button
        className={cx(
          "font-bold py-2 px-4 rounded text-center translate-y-0 hover:-translate-y-1 transition-transform ease-in focus:-translate-y-1 active:translate-y-0",
          {
            "bg-gray-900 hover:bg-gray-950 text-white": !isOutlined,
            "border-2 border-gray-900 hover:border-gray-950 bg-white hover:bg-white/80":
              isOutlined,
          }
        )}
        type={type}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
