import { Descendant } from "slate";

export const HOTKEYS: Record<string, 'bold' | 'italic' | 'underline'> = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
};

export const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const INITIAL_VALUE: Descendant[] = [
	{ type: "paragraph", children: [{ text: "" }] },
];