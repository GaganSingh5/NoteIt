import axios from "axios";
import qs from 'qs';

const requestHeader = {
    "content-type": "application/x-www-form-urlencoded",
};

const getNotesHandler = (userId: string) => {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/${userId}/posts`
    );
};

const addNoteHandler = (userId: string,note: any) => {
    return axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/${userId}/posts`,
        qs.stringify(note),
        {
            headers: requestHeader,
        }
    );
}

const updateNoteHandler = (userId: string, noteId: string, note:any) => {
    return axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/${userId}/posts/${noteId}`,
        qs.stringify(note),
        {
            headers: requestHeader,
        }
        ); 
}

const deleteNoteHandler = (userId: string, noteId: string) => {
    return axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/${userId}/posts/${noteId}`,
        {
        headers: requestHeader,
        }
    );
};


const NotesSerivce = {
    getNotesHandler,
    addNoteHandler,
    deleteNoteHandler,
    updateNoteHandler
};

export default NotesSerivce;
