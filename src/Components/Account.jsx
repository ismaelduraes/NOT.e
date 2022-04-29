import { signOut } from "@firebase/auth";
import { auth } from "../firebase-config";
import React from "react";
import { IoExitOutline } from "react-icons/io5";

function Account(props) {
    function signUserOut() {
        signOut(auth).then(() => {
            props.setIsAuth(false);
            props.accountPopupHook(false);
        });
    }

    return (
        <div className="account_container">
            <h2 className="user_display_name">{props.displayName}</h2>
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
