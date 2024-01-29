"use client";

import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import {
  UseControllerProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { INITIAL_VALUE } from "../constants";
import { PropsWithClassName } from "~/interfaces/utilities";
import { FormFieldControl } from "~/components/FormFieldControl";
import cx from "classnames";
import { HOTKEYS } from "../constants";
import { Toolbar } from "../components/Toolbar";
import isHotkey from "is-hotkey";
import { toggleMark } from "../utilities";
import { useRenderElement, useRenderLeaf } from "../hooks";

interface Props<Fields extends FieldValues>
  extends PropsWithClassName,
    UseControllerProps<Fields> {
  label: string;
}

export function FieldRichText<Fields extends FieldValues>({
  label,
  className,
  ...props
}: Props<Fields>) {
  const { field, fieldState } = useController(props);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();

  return (
    <FormFieldControl
      label={label}
      name={field.name}
      errorMessage={fieldState?.error?.message}
      className={cx(className, "!w-full")}
    >
      <Slate
        editor={editor}
        initialValue={field.value ?? INITIAL_VALUE}
        onChange={(value) => field.onChange({ target: { value } })}
      >
        <div className="flex flex-col border-2 border-gray-900 active:border-gray-950 focus:border-gray-950 rounded h-full">
          <Toolbar />

          <Editable
            spellCheck
            autoFocus
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className="h-full grow focus:outline-none py-2 px-4"
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
        </div>
      </Slate>
    </FormFieldControl>
  );
}
