"use client";

import React, { useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { useRenderElement, useRenderLeaf } from "../hooks";

interface Props {
  content: Descendant[];
}

export function FieldRichTextReadOnly({ content }: Props) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();

  return (
    <Slate editor={editor} initialValue={content}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className="h-full focus:outline-none border-2 border-gray-900 active:border-gray-950 focus:border-gray-950 rounded py-2 px-4"
      />
    </Slate>
  );
}
