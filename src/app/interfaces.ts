import {Note} from "@/types";

export interface HeaderProps {
    onChangeTab: (tab: string) => void;
}

export interface HeadingProps {
    children: string;
}

export interface CardProps {
    note?: Note;
    withDelete?: boolean;
    withArchive?: boolean;
    classNameProp?: string;
    onSave?: (note: Note) => void;
    onArchive?: (note: Note) => void;
    onDelete?: (note_id: number) => void;
}

export interface NoteListProps {
    isArchived: boolean
}