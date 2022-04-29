import "./styles/App.css";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect } from "react";
import { getNotes } from "./Functions/NoteManager";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CircularProgress from "@mui/material/CircularProgress";

import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import Note from "./Components/Note";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import Create from "./Components/Create";
import SignIn from "./Screens/SignIn";
import Account from "./Components/Account";
import NotePage from "./Components/NotePage";
import { DataContext } from "./Context/DataContext";

function App() {
    const [loaded, setLoaded] = useState(false);
    //enables and disables note creation screen
    const [isCreating, setIsCreating] = useState(false);
    //enables and disables account popup
    const [isAccountPopupVisible, setAccountPopupVisible] = useState(false);

    const [searchFilter, setSearchFilter] = useState("");

    //renders main page only if user is authenticated
    const [isAuth, setIsAuth] = useState(false);

    //call to re-render page and reload notes
    const [update, setUpdate] = useState(0);

    const [notes, setNotes] = useState([]);

    const [user, setUser] = useState();

    const [canScroll, setCanScroll] = useState(true);

    const [selectedNoteData, setSelectedNoteData] = useState({});
    const [isNotePageVisible, setNotePageVisible] = useState(false);

    //get notes on mount
    useEffect(() => {
        //checks authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsAuth(true);

                //set auto update
                setInterval(() => {
                    getNotes(user).then((r) => {
                        setNotes(r.reverse());
                        setLoaded(true);
                    });
                }, 100000);
            } else {
                setIsAuth(false);
            }
        });

        //fetch notes
        if (user) {
            //fetch once on auth
            getNotes(user).then((r) => {
                setNotes(r.reverse());
                setLoaded(true);
            });
        }

        return;
    }, [isAuth]);

    useEffect(() => {
        if (canScroll) {
            document.getElementById("body").style.overflow = "visible";
            // console.log('canScroll')
        } else {
            document.getElementById("body").style.overflow = "hidden";
            // console.log('cantScroll')
        }
    }, [canScroll]);

    if (!isAuth) return <SignIn />;

    //MAIN APP
    return (
        <DataContext.Provider
            value={{
                getNotes,
                setNotes,
                setUpdate,
                setSelectedNoteData,
                selectedNoteData,
            }}
        >
            <div className="App">
                {/* <ImageSearch query="flowers"/> */}

                {isCreating && (
                    <Create
                        setIsCreating={setIsCreating}
                        enableScroll={setCanScroll}
                    />
                )}

                {isAccountPopupVisible && (
                    <Account
                        displayName={user.displayName}
                        setIsAuth={setIsAuth}
                        accountPopupHook={setAccountPopupVisible}
                    />
                )}

                {isNotePageVisible && (
                    <NotePage
                        //this data property is managed by whatever note you click on.
                        //there is always only one NotePage component, and the Note component changes
                        //what data the NotePage component will display (by setting the data prop)
                        //check Note.js if confused
                        data={selectedNoteData}
                        setNotePageVisible={setNotePageVisible}
                        enableScroll={setCanScroll}
                    />
                )}

                <Header
                    userPic={user.photoURL}
                    updateHook={setUpdate}
                    update={update}
                    accountPopupHook={setAccountPopupVisible}
                    accountPopupState={isAccountPopupVisible}
                />
                <SearchBar setSearchFilter={setSearchFilter} />
                <p className="notes_title">Suas notas</p>

                {!loaded && (
                    <div className="loading">
                        <CircularProgress color="primary" />
                    </div>
                )}

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
                        {
                            //map user notes to notes component and put the user note data into it as props
                            notes.map((note) => {
                                const filter = `${note._document.data.value.mapValue.fields.title.stringValue} ${note._document.data.value.mapValue.fields.text.stringValue}`;
                                if (
                                    filter
                                        .toLowerCase()
                                        .includes(searchFilter.toLowerCase())
                                ) {
                                    return (
                                        <Note
                                            title={
                                                note._document.data.value
                                                    .mapValue.fields.title
                                                    .stringValue
                                            }
                                            text={
                                                note._document.data.value
                                                    .mapValue.fields.text
                                                    .stringValue
                                            }
                                            image={
                                                note._document.data.value
                                                    .mapValue.fields.imageURL
                                                    ? note._document.data.value
                                                          .mapValue.fields
                                                          .imageURL.stringValue
                                                    : ""
                                            }
                                            imageId={
                                                note._document.data.value
                                                    .mapValue.fields.imageId
                                                    ? note._document.data.value
                                                          .mapValue.fields
                                                          .imageId.stringValue
                                                    : ""
                                            }
                                            colorCSS={
                                                note._document.data.value
                                                    .mapValue.fields.colorCSS
                                                    .stringValue
                                            }
                                            colorAvg={parseInt(
                                                note._document.data.value
                                                    .mapValue.fields.colorAvg
                                                    .integerValue
                                            )}
                                            noteId={
                                                note._key.path.segments[
                                                    note._key.path.segments
                                                        .length - 1
                                                ]
                                            }
                                            key={
                                                note._key.path.segments[
                                                    note._key.path.segments
                                                        .length - 1
                                                ]
                                            }
                                            //pass update hook into note as prop so it can update the page itself
                                            update={update}
                                            updateHook={setUpdate}
                                            setNotePageVisible={
                                                setNotePageVisible
                                            }
                                        />
                                    );
                                }
                            })
                        }
                    </Masonry>
                </ResponsiveMasonry>

                {loaded && (
                    <div
                        className="new_button"
                        onClick={() => {
                            setIsCreating(true);
                        }}
                    >
                        <CreateRoundedIcon className="create_icon" />
                    </div>
                )}
            </div>
        </DataContext.Provider>
    );
}

export default App;
