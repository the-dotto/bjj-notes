"use client";

import Link from "next/link";
import cx from "classnames";
import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

interface Props extends PropsWithChildren {
  href: string;
  isLastItem?: boolean;
}

export function HeaderLink({ href, children, isLastItem = false }: Props) {
  const path = usePathname();

  return (
    <div
      className={cx(
        "h-full grid place-items-center transition-colors border-r-2 md:first:border-l-gray-900 md:first:border-l-2 border-r-gray-900 last:border-r-0 last:border-r-transparent group max-md:self-stretch",
        {
          "bg-gray-900 text-white": path === href,
          "text-gray-700 bg-transparent": path !== href,
        }
      )}
    >
      <Link
        className={cx("py-2", { "md:px-4": !isLastItem, "md:pl-4": isLastItem })}
        href={href}
      >
        {children}
      </Link>
    </div>
  );
}
