import { React, useState, useContext, useEffect } from "react";

import { deleteNote, getNotes, setNote } from "../Functions/NoteManager";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IoTrashOutline } from "react-icons/io5";
import { DataContext } from "../Context/DataContext";
import { getImageById } from "../Functions/ImageManager";

function EditNoteModal({ setEditNotePageOpen, enableScroll }) {
    const { selectedNoteData } = useContext(DataContext);
    const { colorAvg } = selectedNoteData;
    const { setNotes } = useContext(DataContext);

    let textColor = checkOverThreshold(colorAvg) ? "white" : "black";
    let bgColor = checkOverThreshold(colorAvg) ? "black" : "white";

    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
        if (selectedNoteData.imageId !== undefined)
            getImageById(selectedNoteData.imageId).then((r) => {
                setImageURL(r);
            });
    }, []);

    function checkOverThreshold(colorAvg) {
        if (colorAvg <= 360) {
            return true;
        } else {
            return false;
        }
    }

    const [noteTitle, setNoteTitle] = useState(selectedNoteData.title);
    const [noteText, setNoteText] = useState(selectedNoteData.text);

    async function updateNote() {
        setNote(
            selectedNoteData.noteId,
            noteTitle,
            noteText,
            {
                css: selectedNoteData.colorCSS,
                colorAvg: colorAvg,
            },
            selectedNoteData.imageId ? selectedNoteData.imageId : ""
        );
        getNotes().then((r) => setNotes(r));
        setEditNotePageOpen(false);
    }

    enableScroll(false);

    return (
        <div
            className="note_page_container"
            onClick={() => {
                setEditNotePageOpen(false);
                enableScroll(true);
            }}
        >
            <div
                className="create_prompt"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: selectedNoteData.colorCSS,
                    color: textColor,
                    // boxShadow: `0px 0px 80px ${selectedNoteData.colorCSS}`,
                }}
            >
                <div className="header">
                    {imageURL ? (
                        <img src={imageURL} alt="" className="note_img" />
                    ) : null}

                    <input
                        style={{ color: textColor }}
                        type="text"
                        defaultValue={selectedNoteData.title}
                        className="prompt_title"
                        onChange={(e) => {
                            setNoteTitle(e.target.value);
                        }}
                    />

                    <CloseRoundedIcon
                        className="prompt_close"
                        style={{ background: "white", color: "black" }}
                        onClick={() => {
                            enableScroll(true);
                            setEditNotePageOpen(false);
                            updateNote();
                        }}
                    />
                </div>

                <div className="note_text_container">
                    <textarea
                        style={{ color: textColor }}
                        className="prompt_note_text"
                        defaultValue={selectedNoteData.text}
                        onChange={(e) => {
                            setNoteText(e.target.value);
                        }}
                    />
                </div>

                <div className="create_buttons">
                    <div className="icon_buttons" style={{ color: textColor }}>
                        <IoTrashOutline
                            className="icon"
                            onClick={() => {
                                deleteNote(selectedNoteData.noteId);
                                getNotes().then((r) => setNotes(r));
                                enableScroll(true);
                                setEditNotePageOpen(false);
                            }}
                        />
                    </div>
                    <div
                        style={{ background: textColor, color: bgColor }}
                        onClick={() => {
                            enableScroll(true);
                            setEditNotePageOpen(false);
                            if (noteTitle === "") {
                                setNoteTitle("Nota sem nome");
                            }
                            if (noteText === "") {
                                setNoteText("Nota sem conteúdo");
                            }
                            updateNote();
                        }}
                        className="save_button"
                    >
                        Pronto
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditNoteModal;
