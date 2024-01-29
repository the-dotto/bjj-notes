'use client';

import { useSlate } from "slate-react";
import { Button } from "./Button";
import { isBlockActive, toggleBlock } from "../utilities";
import { PropsWithChildren } from "react";
import { CustomElement } from "~/interfaces/slate";

interface Props extends PropsWithChildren {
  format: CustomElement["type"];
}

export function BlockButton({ format, children }: Props) {
  const editor = useSlate();

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {children}
    </Button>
  );
}
