import React, { useContext, useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { BsPin } from "react-icons/bs";

import { deleteNote, getNotes } from "../Functions/NoteManager";
import { getImageById } from "../Functions/ImageManager";

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
    setEditNotePageOpen,
}) {
    const dataContext = useContext(DataContext);

    //sets text to apropriate color
    //if above a certain brightness threshold
    let textColor = setTextColor();
    function setTextColor() {
        if (colorAvg <= 360) return "white";
        return "black";
    }

    //set
    const [imageURL, setImageURL] = useState("");
    //get image url by its id
    useEffect(() => {
        if (imageId !== undefined)
            getImageById(imageId).then((r) => {
                setImageURL(r);
            });
    }, []);

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
                setEditNotePageOpen(true);
            }}
            style={{
                background: colorCSS,
                color: textColor,
            }}
        >
            <div className="title_container">
                <h3 className="note_title">{title}</h3>
            </div>

            {imageURL ? <img src={imageURL} className="note_img" /> : null}

            {/* NOTE TEXT */}
            <p className="note_text">{text}</p>

            {/* BOTTOM BUTTONS */}
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
