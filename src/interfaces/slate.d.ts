import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type TextElement = {
	type: 'paragraph' | 'heading';
	children: CustomText[]
}

export type ListElement = {
	type: 'bulleted-list' | 'numbered-list' | 'list-item'
	children: ListItemElement[]
}

export type CustomElement = TextElement;

export type FormattedText = { text: string; bold?: true, italic?: true }

export type CustomText = FormattedText

declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor
		Element: CustomElement
		Text: CustomText
	}
}
