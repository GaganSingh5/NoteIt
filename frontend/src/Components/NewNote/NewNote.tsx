import React, { useContext, useEffect, useState } from 'react';
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
// import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
// import PropTypes from 'prop-types'
import './NewNote.less';
import "draft-js/dist/Draft.css";
import createToolbarPlugin, {
    Separator
} from "@draft-js-plugins/static-toolbar";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
} from "@draft-js-plugins/buttons";
import { useForm } from "react-hook-form";
import AuthContext from '../../Context/AuthProvider';
import NoteService from '../../Views/NotesView/Services/Notes.service'
import { useLocation, useNavigate } from 'react-router-dom';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const NewNote = (props: any) => {
    const location: any = useLocation();
    const [mode, setMode] = useState('')
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext)
    let editorRef: any = null;
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    useEffect(()=>{
        setMode(location.state?.mode);
    },[])


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
    });

    useEffect(()=> {
        if(mode==='edit') {
            setValue('title', location.state.title);
            const newEditorContent = convertFromRaw(JSON.parse(location.state.content));
            const newEditorState = EditorState.createWithContent(newEditorContent);

            setEditorState(newEditorState);
        } else if(mode === 'preview') {
            const newEditorContent = convertFromRaw(JSON.parse(location.state.content));
            const newEditorState = EditorState.createWithContent(newEditorContent);

            setEditorState(newEditorState);
        }
    },[mode])

    const focus = () => {
        editorRef.focus();
    };

    const addNote = (data: any) => {
        
        const rawContent = convertToRaw(editorState.getCurrentContent());
        data.content = JSON.stringify(rawContent);
        console.log(data);
        NoteService.addNoteHandler(auth.userId, data)
            .then((res: any) => {
                console.log(res);
                navigate('/notes')
            })
            .catch((err: any) => {
                console.log(err);
            });
    };

    const backToNotes = (event: any)=> {
        event.preventDefault;
        navigate("/notes");
    }

    const editNote = (data: any) => {
            const rawContent = convertToRaw(editorState.getCurrentContent());
            data.content = JSON.stringify(rawContent);
            console.log(data);
            NoteService.updateNoteHandler(auth.userId, location.state.noteId, data)
            .then((res: any) => {
                console.log(res);
                navigate("/notes");
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    return (
        <form className="note-container" onSubmit={handleSubmit((mode==='new')?addNote:editNote)}>
            <div className="note-new-card">
                {mode!== 'preview' && errors.title && (
                    <div className="note-error">
                        <p>Title cannot be Empty! 😲</p>
                    </div>
                )}

                <div className="note-title-container">
                    {/* <div className="cover-image">
                        <label htmlFor="coverimage">
                Add Cover Image
                            <input
                                {...register("coverimage")}
                                type="file"
                                name="coverimage"
                                id="coverimage"
                            />
                        </label>
                    </div> */}
                    <div className="note-title">
                        {
                            (mode ==='preview') &&
                            (<h1>
                                {location.state.title}
                            </h1>)
                        }
                        { 
                            (mode ==='edit' || mode ==='new') &&
                            (<textarea
                            {...register("title", { required: true })}
                            name="title"
                            id="title"
                            placeholder="New Note Title Here..."
                        />)
                        }
                        
                    </div>
                </div>
                <div className="note-content-container" onClick={focus}>
                    {
                        (mode==="edit" || mode==="new") && (
                    <div className="note-toolbar noteit-dot-pattern" >
                        <Toolbar>
                            {
                                // may be use React.Fragment instead of div to improve perfomance after React 16
                                (externalProps) => (
                                    <div>
                                        <BoldButton {...externalProps} />
                                        <ItalicButton {...externalProps} />
                                        <UnderlineButton {...externalProps} />
                                        <CodeButton {...externalProps} />
                                        <HeadlineTwoButton {...externalProps} />
                                        <HeadlineThreeButton {...externalProps} />
                                        <UnorderedListButton {...externalProps} />
                                        <OrderedListButton {...externalProps} />
                                        <BlockquoteButton {...externalProps} />
                                        <CodeBlockButton {...externalProps} />
                                    </div>
                                )
                            }
                        </Toolbar>
                    </div>
                        )
                    }
                    
                    <div className="note-content">
                        <Editor
                            readOnly={(mode==="preview")?true:false}
                            {...register("content")}
                            placeholder="Write your note here....."
                            editorState={editorState}
                            onChange={setEditorState}
                            plugins={[staticToolbarPlugin]}
                            ref={(element) => {
                                editorRef = element;
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="note-submit">
                {
                    (mode=="edit") && <button className="noteit-button">Edit Note</button> ||
                    (mode=="new") && <button className="noteit-button">Add Note</button>
                }
                <button onClick={backToNotes} className="noteit-button">Back</button>
            </div>
        </form>
    );
};

// AddNote.propTypes = {}

export default NewNote;
