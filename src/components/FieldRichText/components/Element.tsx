import { PropsWithChildren } from "react";
import { CustomElement } from "~/interfaces/slate";

interface Props extends PropsWithChildren {
  element: CustomElement;
  attributes: Record<string, unknown>;
}

export const Element = ({ attributes, children, element }: Props) => {
  switch (element.type) {
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
