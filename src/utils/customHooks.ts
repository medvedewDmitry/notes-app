import { useState, useMemo } from 'react';

/**
 * Поиск заметок
 * @param notesStore
 * @param query
 */
export const useSearchNotes = (notesStore, query = '') => {
    const [searchQuery, setSearchQuery] = useState(query || '');

    const filteredNotes = useMemo(() => {
        if (!searchQuery) return notesStore;

        return notesStore.filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [notesStore, searchQuery]);

    return { filteredNotes, searchQuery, setSearchQuery };
};


