'use client'

import './home.scss'
import Card from "@/app/UI/Card/Card";
import notesStore from "@/store/notesStore/notesStore";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import NoteList from "@/app/components/NoteList/NoteList";
import Header from "@/app/components/Header/Header";
import {CgNotes} from "react-icons/cg";
import Heading3 from "@/app/UI/Heading3";

const Home = observer(() => {
    const [tab, setTab] = useState('main')
    useEffect(() => {
        notesStore.fetchNotes();
    }, []);

    return (
        <>
            <Header
                onChangeTab={(tab) => {
                    setTab(tab)
                }}
            />
            <main className="home-page">
                <section className="home-page__create">
                    <Card
                        classNameProp="--create"
                        withDelete={false}
                        withArchive={false}
                        onSave={(note) => {
                            notesStore.createNote(note)
                        }}
                    />
                </section>
                <section className="main-content">
                    <div className="heading">
                        <div className="heading__icon">
                            <CgNotes/>
                        </div>
                        <Heading3>{tab === 'main' ? 'Основные' : 'Архивные'}</Heading3>
                    </div>
                    <NoteList
                        isArchived={tab !== 'main'}
                    />
                </section>

            </main>
        </>
    )
})


export default Home;