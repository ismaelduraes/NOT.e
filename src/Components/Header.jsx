import React, { useState } from "react";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { GrRefresh } from "react-icons/gr";
import Account from "./Account";
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

function Header({ userDisplayName, userPic }) {
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    return (
        <div className="header_container">
            {accountMenuOpen ? (
                <Account
                    displayName={userDisplayName}
                    accountPopupHook={setAccountMenuOpen}
                />
            ) : null}
            <div
                className="header_left"
                style={{ display: "flex", alignItems: "center" }}
            >
                <EventNoteOutlinedIcon className="logo" />
                <h1 className="header_title">not.e</h1>
            </div>
            <div className="header_right">
                <img
                    src={userPic}
                    alt=""
                    className="user_img"
                    onClick={() => {
                        if (!accountMenuOpen) {
                            setAccountMenuOpen(true);
                        } else {
                            setAccountMenuOpen(false);
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Header;
