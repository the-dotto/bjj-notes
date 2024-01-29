import { forwardRef } from "react";
import cx from "classnames";
import { PropsWithClassName } from "~/interfaces/utilities";
import { MarkButton } from "./MarkButton";
// import { BlockButton } from "./BlockButton";
import { Icon } from "./Icon";

export const Toolbar = forwardRef<HTMLDivElement, PropsWithClassName>(
  ({ className }, ref) => (
    <div
      ref={ref}
      className={cx(
        "relative py-2 px-4 border-b-2 border-b-gray-900 flex gap-1",
        className
      )}
    >
      <MarkButton format="bold">
        <Icon type="bold" />
      </MarkButton>

      <MarkButton format="italic">
        <Icon type="italic" />
      </MarkButton>

      {/* <MarkButton format="underline">
        <Icon type="underline" />
      </MarkButton> */}

      {/* <BlockButton format="heading-one">
        <Icon type="heading-one" />
      </BlockButton> */}

      {/* <BlockButton format="heading">
        <Icon type="heading" />
      </BlockButton> */}

      {/* <BlockButton format="numbered-list">
        <Icon type="numbered-list" />
      </BlockButton>

      <BlockButton format="bulleted-list">
        <Icon type="bulleted-list" />
      </BlockButton> */}
    </div>
  )
);

Toolbar.displayName = "Toolbar";
