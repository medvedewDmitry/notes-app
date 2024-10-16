import {makeAutoObservable} from "mobx";
import {Note} from "@/types";
import {apiRequest} from "@/app/api/requests";
import axios from "axios";

class NotesStore {
    notes: Note[] = []

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Запрос записок
     */
    fetchNotes = async () => {
        try {
            const response = await apiRequest.get('api/get-notes');
            if (response.data.success) {
                this.setNotes = response.data.notes
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
    /**
     * Создание заметки
     * @param note
     */
    createNote = async (note: Note) => {
        try {
            const newNote = {...note, id: 0}
            const response = await apiRequest.post('api/create-note', newNote);
            console.log("createNote response", response)
            if (response.data.success) {
                this.fetchNotes()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
    /**
     * Редактирование заметки
     * @param note
     */
    updateNote = async (note: Note) => {
        console.log("updateNote note", note)
        try {
            const response = await apiRequest.put('api/update-note', note);
            console.log("updateNote response", response)
            if (response.data.success) {
                this.fetchNotes()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
    /**
     * Удаление заметки
     * @param note_id
     */
    deleteNote = async (note_id: number) => {
        try {

            const response = await apiRequest.post('api/delete-note', note_id);
            console.log("createNote response", response)
            if (response.data.success) {
                this.fetchNotes()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }


    /**
     * Установка записок
     * @param notes - список записок
     */
    set setNotes(notes: Note[]) {
        this.notes = notes
    }

    /**
     * Получение заметок
     */
    get getNotes() {
        return this.notes;
    }

    /**
     * Получение заметок архивированные/неархиированные
     */
    getNotesByArchiveType(isArchived: boolean) {
        return this.getNotes?.filter((note) => note.is_archived === isArchived)
    }
}

const notesStore = new NotesStore();

export default notesStore;