'use client';

import { PropsWithChildren } from "react";
import { Button } from "./Button";
import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "../utilities";

interface Props extends PropsWithChildren {
  format: "bold" | "italic" | "underline";
}

export function MarkButton({ format, children }: Props) {
  const editor = useSlate();

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children}
    </Button>
  );
}
