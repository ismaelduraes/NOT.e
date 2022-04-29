import "./styles/App.css";
import { useState, useEffect } from "react";

import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import SignIn from "./Screens/SignIn";
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
