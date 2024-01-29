import { PropsWithChildren } from "react";
import { FormattedText } from "~/interfaces/slate";

interface Props extends PropsWithChildren {
  leaf: FormattedText;
  attributes: Record<string, unknown>;
}

export const Leaf = ({ attributes, children, leaf }: Props) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  return <span {...attributes}>{children}</span>;
};
