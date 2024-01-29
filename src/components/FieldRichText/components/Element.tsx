import { PropsWithChildren } from "react";
import { CustomElement } from "~/interfaces/slate";

interface Props extends PropsWithChildren {
  element: CustomElement;
  attributes: Record<string, unknown>;
}

export const Element = ({ attributes, children, element }: Props) => {
  switch (element.type) {
    case "heading":
      return <h2 {...attributes}>{children}</h2>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
