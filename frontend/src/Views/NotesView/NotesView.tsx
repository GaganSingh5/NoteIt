import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import NoteCard from '../../Components/NoteCard/NoteCard';
import Quote from '../../Components/Quote/Quote';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
// import PropTypes from 'prop-types'
import './NotesView.less';
import NotesSerivce from "./Services/Notes.service";
import getQuoteHandler from './Services/Quotes.service';

import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from "../../Context/AuthProvider";
import Header from '../../Components/Header/Header';


const NotesView = (props: any) => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext)
    const [notes, setNotes] = useState(new Array(0));
    const [quote, setQuote] = useState('');
    useEffect(() => {
        console.log("Notes UseEffect");
        NotesSerivce.getNotesHandler(auth.userId).then((notesResponse) => {
            console.log("notes", notesResponse);
            setNotes(notesResponse.data.posts);
        }).catch(err => {
            // const arr = [err];
            // setNotes(arr);
            console.log(err);
        });
    }, []);

    useEffect(() => {
        console.log("Quote UseEffect");
        getQuoteHandler().then((quoteResponse) => {
            console.log("quote", quoteResponse);
            setQuote(quoteResponse.data['h']);
        });
    }, []);

    const updateNotes = (noteId: string)=> {
        const newNotes = notes.filter((note) => {
            return note._id !== noteId;
        });

        setNotes(newNotes);
    }

    const previewNote = (id: string, title: string, content: string) => {
        console.log("preview");
        
        const noteState = {
            mode: 'preview',
            id,
            title,
            content
        }
        navigate('/preview',{
            replace: false, state: noteState
        })
    }

    const triggerAddNote = () => {
        const noteState = {
            mode: 'new',
        }
        navigate('/new',{
            replace: false, state: noteState
        })
    }

    return (
        <>
            <Header />
            <div className="notes-view-container">
            <div className="notes-view-greeting">
                <h1>
                Welcome,
                <br />{" "}
                {auth?.firstname?.charAt(0).toUpperCase() +
                    auth?.firstname?.slice(1)}{" "}
                👋
                </h1>
            </div>
            <div>
                <Quote quote={quote} />
            </div>
            <div className="notes-header">
                <h2>Notes 📋</h2>
                <button onClick={() => triggerAddNote()} className="noteit-button">
                Add Note <FontAwesomeIcon icon={faAdd} />
                </button>
            </div>
            <div className="notes-card-container">
                {notes.map((note) => {
                return (
                    <NoteCard
                    key={note._id}
                    noteId={note._id}
                    title={note.title}
                    content={note.content}
                    imageUrl={note.coverUrl}
                    updateNotes={updateNotes}
                    previewNote={previewNote}
                    />
                );
                })}
            </div>
            </div>
        </>
    );
};

// Notes.propTypes = {}

export default NotesView;
