import { CreateRounded } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Create from "../Components/Create";
import EditNoteModal from "../Components/EditNoteModal";
import Header from "../Components/Header";
import Note from "../Components/Note";
import SearchBar from "../Components/SearchBar";
import { AuthContext } from "../Context/AuthContext";

import { DataContext } from "../Context/DataContext";
import { getNotes } from "../Functions/NoteManager";

function Main() {
    const [notes, setNotes] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const { user } = useContext(AuthContext);

    const [canScroll, setCanScroll] = useState(true);

    const [editNotePageOpen, setEditNotePageOpen] = useState(false);
    const [createNotePageOpen, setCreateNotePageOpen] = useState(false);

    const [searchFilter, setSearchFilter] = useState("");

    const [selectedNoteData, setSelectedNoteData] = useState({});

    useEffect(() => {
        //setting overflow to hidden prevents page from
        //scrolling when NotePage modal is visible.

        //the EditNoteModal component gets the setCanScroll
        //function as a prop so it can disable scroll when open,
        //and enable it when hidden.
        if (canScroll) {
            document.getElementById("body").style.overflow = "visible";
        } else {
            document.getElementById("body").style.overflow = "hidden";
        }

        //fetch notes
    }, [canScroll]);
    useEffect(() => {
        getNotes().then((r) => {
            setNotes(r);
            setLoaded(true);
        });
        //set auto update
        setInterval(() => {
            getNotes().then((r) => {
                setNotes(r);
            });
        }, 100000);
    }, []);

    return (
        <DataContext.Provider
            value={{
                setNotes,
                //↓ each Note component can individually
                //set EditNoteModal as visible and hydrate it with it's own data.
                setSelectedNoteData,
                selectedNoteData,
            }}
        >
            <Header
                userPic={user.photoURL}
                userDisplayName={user.displayName}
            />
            <SearchBar setSearchFilter={setSearchFilter} />

            {/*  */}
            {/* ↓ NOTE EDITOR */}
            {editNotePageOpen ? (
                <EditNoteModal
                    setEditNotePageOpen={setEditNotePageOpen}
                    enableScroll={setCanScroll}
                />
            ) : null}

            {/*  */}
            {/* ↓ NOTE CREATOR */}
            {createNotePageOpen ? (
                <Create
                    setCreateNotePageOpen={setCreateNotePageOpen}
                    enableScroll={setCanScroll}
                />
            ) : null}

            <p className="notes_title">Suas notas</p>

            {!loaded && (
                <div className="loading">
                    <CircularProgress color="primary" />
                </div>
            )}

            {/*  */}
            {/* ↓ NOTES */}
            <ResponsiveMasonry
                columnsCountBreakPoints={{
                    0: 2,
                    300: 2,
                    550: 3,
                    800: 4,
                    1200: 5,
                }}
            >
                <Masonry gutter={10} className="notes">
                    {notes.map((note) => {
                        const filter = `${note._document.data.value.mapValue.fields.title.stringValue} ${note._document.data.value.mapValue.fields.text.stringValue}`;
                        if (
                            filter
                                .toLowerCase()
                                .includes(searchFilter.toLowerCase())
                        ) {
                            return (
                                <Note
                                    title={
                                        note._document.data.value.mapValue
                                            .fields.title.stringValue
                                    }
                                    text={
                                        note._document.data.value.mapValue
                                            .fields.text.stringValue
                                    }
                                    imageId={
                                        note._document.data.value.mapValue
                                            .fields.imageId
                                            ? note._document.data.value.mapValue
                                                  .fields.imageId.stringValue
                                            : note._document.data.value.mapValue
                                                  .fields.imageId.integerValue
                                    }
                                    colorCSS={
                                        note._document.data.value.mapValue
                                            .fields.colorCSS.stringValue
                                    }
                                    colorAvg={parseInt(
                                        note._document.data.value.mapValue
                                            .fields.colorAvg.integerValue
                                    )}
                                    noteId={
                                        note._key.path.segments[
                                            note._key.path.segments.length - 1
                                        ]
                                    }
                                    key={
                                        note._key.path.segments[
                                            note._key.path.segments.length - 1
                                        ]
                                    }
                                    setEditNotePageOpen={setEditNotePageOpen}
                                />
                            );
                        }
                    })}
                </Masonry>
            </ResponsiveMasonry>

            <div
                className="new_button"
                onClick={() => {
                    setCreateNotePageOpen(true);
                }}
            >
                <CreateRounded className="create_icon" />
            </div>
        </DataContext.Provider>
    );
}

export default Main;
