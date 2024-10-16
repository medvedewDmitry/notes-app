import {Note} from "@/types";

export const notesList: Note[] = [
    {id: 1, title: 'Обычная заметка', desc: 'Так много текста хотел написать да нечего', author_id: 1, is_archived: false, time_created: new Date()},
]
export const archivedNotes: Note[] = [
    {id: 1, title: 'Архивированная заметка', desc: 'Так много текста хотел написать да нечего', author_id: 1, is_archived: true, time_created: new Date()},
]