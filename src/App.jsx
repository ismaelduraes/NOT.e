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
import EditNoteModal from "./Components/EditNoteModal";
import { DataContext } from "./Context/DataContext";
import Main from "./Screens/Main";
import { AuthContext } from "./Context/AuthContext";

function App() {
    const [loaded, setLoaded] = useState(false);

    //renders main page only if user is authenticated
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        //checks authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsAuth(true);
                setLoaded(true);
            } else {
                setIsAuth(false);
                setLoaded(true);
            }
        });

        return;
    }, [isAuth]);

    if (!loaded) return null;

    if (!isAuth) return <SignIn />;

    return (
        <AuthContext.Provider value={{ user, isAuth, setIsAuth }}>
            <Main />
        </AuthContext.Provider>
    );
}

export default App;
