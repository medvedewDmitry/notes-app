'use client'
import React from 'react';
import notesStore from "@/store/notesStore/notesStore";
import {Note} from "@/types";
import Card from "@/app/components/Card/Card";
import {observer} from "mobx-react-lite";
import './notes-list.scss'
import {NoteListProps} from "@/app/interfaces";


const NoteList = observer(({isArchived}:NoteListProps) => {
    return (
        <div className="notes-list">
            {
                notesStore.getNotesByArchiveType(isArchived)?.length !== 0 &&
                (<>
                    <div className="notes-list__cards">
                        {notesStore.getNotesByArchiveType(isArchived)?.map((note: Note) => {
                            return (
                                <Card key={note.id} note={note}
                                      onSave={(note) => {
                                          notesStore.updateNote(note)
                                      }}
                                      onDelete={(note_id) => {
                                          notesStore.deleteNote(note_id)
                                      }}
                                      onArchive={(note) => {
                                          notesStore.updateNote(note);
                                      }}
                                />
                            )
                        })}
                    </div>
                </>)
            }
        </div>
    );
});

export default NoteList;