import React from "react";
import NewNote from "./Components/NewNote/NewNote";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import './Styles/index';
import NotesView from "./Views/NotesView/NotesView";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUpView from "./Views/SignUpView/SignUpView";
import SignInView from "./Views/SignInView/SignInView";
import { useEffect } from "react";
import HeroView from "./Views/HeroView/HeroView";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import PreviewNoteView from "./Views/PreviewNoteView/PreviewNoteView";
import AddNoteView from "./Views/AddNoteView/AddNoteView";
import UpdateNoteView from "./Views/UpdateNoteView/UpdateNoteView";
// import SignUpView from './Views/SignUpView/SignUpView';
const App = () => {
    // const navigateByURL = useNavigate();
    // useEffect(()=> {
    //     console.log("here");
        
    //     const currentURI = window.location.pathname;
    //     console.log(currentURI);
        
    //     navigateByURL(currentURI);
    // },[])
    return (
        <Routes>
            <Route element={<RequireAuth />}>
            <Route path="notes" element={<NotesView />} />
            <Route path="new" element={<AddNoteView />} />
            <Route path="preview" element={<PreviewNoteView />} />
            <Route path="edit" element={<UpdateNoteView />} />
            </Route>
            <Route path="/" element={<HeroView />} />
            <Route path="signup" element={<SignUpView />} />
            <Route path="login" element={<SignInView />} />
        </Routes>
    );
};

export default App;
