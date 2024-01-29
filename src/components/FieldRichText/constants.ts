import { Descendant } from "slate";

export const HOTKEYS: Record<string, 'bold' | 'italic'> = {
	"mod+b": "bold",
	"mod+i": "italic",
};

// export const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const INITIAL_VALUE: Descendant[] = [
	{ type: "paragraph", children: [{ text: "" }] },
];