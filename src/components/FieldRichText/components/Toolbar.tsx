import { forwardRef } from "react";
import cx from "classnames";
import { css } from "@emotion/css";
import { Menu } from "./Menu";
import { PropsWithClassName } from "~/interfaces/utilities";
import { MarkButton } from "./MarkButton";
import { BlockButton } from "./BlockButton";
import { Icon } from "./Icon";

export const Toolbar = forwardRef<HTMLDivElement, PropsWithClassName>(
  ({ className }, ref) => (
    <Menu
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    >
      <MarkButton format="bold">
        <Icon type="bold" />
      </MarkButton>

      <MarkButton format="italic">
        <Icon type="italic" />
      </MarkButton>

      <MarkButton format="underline">
        <Icon type="underline" />
      </MarkButton>

      <BlockButton format="heading-one">
        <Icon type="heading-one" />
      </BlockButton>

      <BlockButton format="heading-two">
        <Icon type="heading-two" />
      </BlockButton>

      <BlockButton format="numbered-list">
        <Icon type="numbered-list" />
      </BlockButton>

      <BlockButton format="bulleted-list">
        <Icon type="bulleted-list" />
      </BlockButton>
    </Menu>
  )
);

Toolbar.displayName = "Toolbar";
