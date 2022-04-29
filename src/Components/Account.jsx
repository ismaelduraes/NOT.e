import { signOut } from "@firebase/auth";
import { auth } from "../firebase-config";
import React, { useContext } from "react";
import { IoExitOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";

function Account({ displayName }) {
    const { setIsAuth } = useContext(AuthContext);
    function signUserOut() {
        signOut(auth).then(() => {
            setIsAuth(false);
        });
    }

    return (
        <div className="account_container">
            <h2 className="user_display_name">{displayName}</h2>
            <ul className="account_ul">
                <li onClick={signUserOut}>
                    <IoExitOutline className="icon" />
                    Sair
                </li>
            </ul>
        </div>
    );
}

export default Account;
