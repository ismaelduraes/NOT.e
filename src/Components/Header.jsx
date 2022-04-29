import React from 'react'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { GrRefresh } from 'react-icons/gr'
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

function Header(props){
    return (
        <div className="header_container">
            <div className="header_left" style={{display: 'flex', alignItems: 'center'}}>
                <EventNoteOutlinedIcon className="logo"/>
                <h1 className="header_title">not.e</h1>
            </div>
            <div className="header_right">
                <img src={props.userPic} alt="" className="user_img"

                onClick={() => {
                    if(!props.accountPopupState){
                        props.accountPopupHook(true)
                    }else{
                        props.accountPopupHook(false)
                    }
                }}
                
                />
                {/* <MenuRoundedIcon className="menu_icon"/> */}
            </div>
        </div>
    )
}

export default Header
