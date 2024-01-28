import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import cx from "classnames";
import { PropsWithClassName } from "~/interfaces/utilities";

interface Props extends LinkProps, PropsWithChildren, PropsWithClassName {
  isOutlined?: boolean;
}

export function ButtonLink({
  className,
  children,
  isOutlined = false,
  ...props
}: Props) {
  return (
    <Link
      className={cx(
        "block font-bold py-2 px-4 rounded text-center",
        {
          "bg-gray-900 hover:bg-gray-950 text-white": !isOutlined,
          "border-2 border-gray-900 hover:border-gray-950":
            isOutlined,
        },
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
