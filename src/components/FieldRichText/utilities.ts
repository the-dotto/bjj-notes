import {
	Editor,
	Element,
	Transforms,
} from "slate";
import { CustomEditor, CustomElement } from "~/interfaces/slate";
// import { LIST_TYPES } from "./constants";

export const isBlockActive = (editor: CustomEditor, format: string, blockType = "type") => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) =>
				!Editor.isEditor(n) &&
				Element.isElement(n) &&
				(n as any)[blockType] === format,
		})
	);

	return !!match;
};

export const isMarkActive = (editor: CustomEditor, format: 'bold' | 'italic') => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

export const toggleBlock = (editor: CustomEditor, format: CustomElement['type']) => {
	const isActive = isBlockActive(
		editor,
		format,
	);
	// const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			Element.isElement(n),
		// && LIST_TYPES.includes((n as any).type),
		split: true,
	});
	let newProperties: Partial<CustomElement>;

	newProperties = {
		// type: isActive ? "paragraph" : isList ? "list-item" : format,
		type: isActive ? "paragraph" : format,
	};

	Transforms.setNodes<Element>(editor, newProperties);

	// if (!isActive && isList) {
	if (!isActive) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

export const toggleMark = (editor: CustomEditor, format: 'bold' | 'italic') => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};