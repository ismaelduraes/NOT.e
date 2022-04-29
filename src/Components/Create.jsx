import { React, useState, useEffect, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";

import ImageSearch from "./ImageSearch";
import { getImageById } from "../Functions/ImageManager";

import { getNotes, submitNote } from "../Functions/NoteManager";
import { DataContext } from "../Context/DataContext";

function Create(props) {
    const [noteTitle, setNoteTitle] = useState("Nota sem nome");
    const [noteText, setNoteText] = useState("Nota sem texto");

    const [imageSearchVisible, setImageSearchVisible] = useState(false);

    const [imageId, setImageId] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [color, setColor] = useState({});

    const dataContext = useContext(DataContext);

    useEffect(() => {
        generateColors();
    }, []);

    useEffect(() => {
        //imageId is set by ImageSearch component
        if (imageId)
            getImageById(imageId).then((r) => {
                setImageURL(r);
            });
    }, [imageId]);

    //colors to be set once not is created
    function generateColors() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        return {
            css: `rgba(${r}, ${g}, ${b}, 255)`,
            colorAvg: r + g + b,
        };
    }

    async function submit() {
        submitNote(noteTitle, noteText, generateColors(), imageId);

        //refetch after creating a new note
        getNotes().then((r) => dataContext.setNotes(r));
        props.setIsCreating(false);
    }
    props.enableScroll(false);

    return (
        <div className="create_container">
            {imageSearchVisible && (
                <ImageSearch
                    setImageId={setImageId}
                    setImageSearchVisible={setImageSearchVisible}
                />
            )}

            <div className="create_prompt">
                {imageURL && <img src={imageURL} alt="" className="note_img" />}

                <div className="header">
                    <input
                        type="text"
                        placeholder="Nova nota..."
                        className="prompt_title"
                        onChange={(e) => {
                            setNoteTitle(e.target.value);
                        }}
                    />
                    <CloseRoundedIcon
                        className="prompt_close"
                        onClick={() => {
                            props.enableScroll(true);
                            props.setIsCreating(false);
                            if (
                                noteTitle !== "Nota sem nome" ||
                                noteText !== "Nota sem texto"
                            ) {
                                submit();
                            }
                        }}
                    />
                </div>

                <div className="note_text_container">
                    <textarea
                        className="prompt_note_text"
                        placeholder="Escreva algo..."
                        onChange={(e) => {
                            setNoteText(e.target.value);
                        }}
                    />
                </div>

                <div className="create_buttons">
                    <div className="icon_buttons">
                        <IoTrashOutline
                            className="icon"
                            onClick={() => props.setIsCreating(false)}
                        />
                        <IoMdImages
                            className="icon"
                            onClick={() => setImageSearchVisible(true)}
                        />
                    </div>
                    <div
                        className="save_button"
                        onClick={() => {
                            props.enableScroll(true);
                            props.setIsCreating(false);
                            if (
                                noteTitle !== "Nota sem nome" ||
                                noteText !== "Nota sem texto"
                            ) {
                                submit();
                            }
                        }}
                    >
                        Criar
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
