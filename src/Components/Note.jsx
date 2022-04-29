import { IoTrashOutline } from "react-icons/io5";
import { BsPin } from "react-icons/bs";

import { deleteNote, getNotes } from "../Functions/NoteManager";
import React, { useContext } from "react";
import { DataContext } from "../Context/DataContext";

function Note({
    title,
    text,
    user,
    uid,
    colorCSS,
    colorAvg,
    noteId,
    imageId,
    setNotePageVisible,
}) {
    let textColor = setTextColor();

    const dataContext = useContext(DataContext);

    function setTextColor() {
        //sets text to apropriate color
        //if above a certain brightness threshold
        if (colorAvg <= 120) return "white";
        return "black";
    }

    return (
        <div
            className="note_container"
            onClick={() => {
                dataContext.setSelectedNoteData({
                    title: title,
                    text: text,
                    user: user,
                    uid: uid,
                    colorCSS: colorCSS,
                    colorAvg: colorAvg,
                    noteId: noteId,
                    imageId: imageId,
                });
                setNotePageVisible(true);
            }}
            style={{
                background: colorCSS,
                color: textColor,
            }}
        >
            <div className="title_container">
                <h3 className="note_title">{title}</h3>
                <BsPin className="pin_icon" />
            </div>

            {imageId ? <img src={imageId} alt="" className="note_img" /> : null}

            <p className="note_text">{text}</p>
            <div className="note_buttons">
                <IoTrashOutline
                    className="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(noteId);
                        getNotes().then((r) => dataContext.setNotes(r));
                    }}
                />
            </div>
        </div>
    );
}

export default Note;
