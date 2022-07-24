import React, { useContext } from 'react';
// import PropTypes from 'prop-types'
import './NoteCard.less';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import NotesSerivce from '../../Views/NotesView/Services/Notes.service';
import AuthContext from '../../Context/AuthProvider';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';

const NoteCard = (props: any) => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext)

    const { title, imageUrl , noteId, content } = props;

    const deleteNote = (event: any) => {
        event.stopPropagation();
        NotesSerivce.deleteNoteHandler(auth.userId, noteId).then((res)=>{
            props.updateNotes(noteId);
        }).catch(err=> {
            console.log(err,'unexpected error');
            
        })
    }

    const editNote = (event: any) => {
        event.stopPropagation();
        const editState = {
            mode: 'edit',
            title,
            noteId,
            content
        }

        navigate('/edit', {replace: false, state: editState})
    }
    return (
        <div className="note-card" onClick={()=> props.previewNote(noteId, title, content)}>
            {/* <div className="note-card-link" /> */}
            <div className="note-card-title">
            <h4>{title}</h4>
            </div>
            <div className="note-card-cover">
            <img src={imageUrl} alt="" />
            </div>
            <div className="note-card-controls">
            <button className="update" onClick={editNote}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="delete" onClick={deleteNote}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            </div>
        </div>
    );
};

// NoteCard.propTypes = {}

export default NoteCard;
