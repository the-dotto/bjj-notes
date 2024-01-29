import { PropsWithChildren } from "react";

export function Chip({ children }: PropsWithChildren) {
  return (
    <span className="flex px-2 py-1 rounded border-2 border-gray-900">
      {children}
    </span>
  );
}
