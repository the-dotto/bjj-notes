import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
	type: 'paragraph'
	children: CustomText[]
}

export type HeadingElement = {
	type: 'heading-one' | 'heading-two'
	children: CustomText[]
}

export type ListElement = {
	type: 'bulleted-list' | 'numbered-list' | 'list-item'
	children: ListItemElement[]
}

export type CustomElement = ParagraphElement | HeadingElement | ListElement

export type FormattedText = { text: string; bold?: true, italic?: true, underline?: true }

export type CustomText = FormattedText

declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor
		Element: CustomElement
		Text: CustomText
	}
}
