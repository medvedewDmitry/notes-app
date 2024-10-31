import {Note} from "@/types";

export interface HeaderProps {
    onChangeTab: (tab: string) => void;
}

export interface NoteListProps {
    isArchived: boolean
}