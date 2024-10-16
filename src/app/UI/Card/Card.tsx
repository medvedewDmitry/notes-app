'use client'
import './card.scss'
import {useEffect, useState} from "react";
import {Note} from "@/types";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import {CardProps} from "@/app/interfaces";

export default function Card(
    {
        note,
        withDelete = true,
        withArchive = true,
        onSave,
        onDelete,
        onArchive,
        classNameProp
    }: CardProps) {
    const [noteCard, setNoteCard] = useState({
        id: 0,
        title: '',
        desc: '',
        author_id: 1,
        is_archived: false,
        time_created: new Date(),
    })

    useEffect(() => {
        if (note) {
            setNoteCard(note)
        }
    }, [note]);
    const handleSave = () => {
        if (onSave) {
            onSave(noteCard);
        }
        setNoteCard({
            id: 0,
            title: '',
            desc: '',
            author_id: 1,
            is_archived: false,
            time_created: new Date(),
        })
    }
    const handleDelete = () => {
        if (onDelete && note) {
            onDelete(note.id)
        }
    }
    const handleArchive = () => {
        if (onArchive) {
            onArchive({...noteCard, is_archived: !noteCard.is_archived})
        }
    }

    return (
        <div className={`card ${classNameProp}`}>
            <div className="card__title">
                <TextField
                    fullWidth
                    multiline={true}
                    inputProps={
                        {maxLength: 100}
                    }
                    maxRows={8}
                    variant="outlined"
                    placeholder="Введите заголовок"
                    value={noteCard.title}
                    onChange={(event) => {
                        setNoteCard({...noteCard, title: event.target.value})
                    }}
                />
            </div>
            <div className="card__desc">
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Заметка..."
                    multiline={true}
                    minRows={3}
                    maxRows={8}
                    value={noteCard.desc}
                    onChange={(event) => {
                        setNoteCard({...noteCard, desc: event.target.value})
                    }}
                />
            </div>
            <div className="card__footer">
                <Button variant="contained" onClick={handleSave}>Сохранить</Button>
                {withDelete && <Button variant="contained" onClick={handleDelete}>Удалить</Button>}
                {withArchive && <Button variant="contained"
                                        onClick={handleArchive}>{noteCard.is_archived ? 'Из архива' : 'В архив'}</Button>}
            </div>


        </div>
    )
}