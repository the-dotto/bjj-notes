"use client";

import { useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { HOTKEYS } from "./constants";
import { Toolbar } from "./components/Toolbar";
import { toggleMark } from "./utilities";
import { useRenderElement, useRenderLeaf } from "./hooks";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

export function FieldRichText<Fields extends FieldValues>(
  props: UseControllerProps<Fields>
) {
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { field } = useController(props);

  return (
    <Slate
      editor={editor}
      initialValue={[]}
      onChange={(value) => field.onChange({ target: { value } })}
    >
      <Toolbar />

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
}
