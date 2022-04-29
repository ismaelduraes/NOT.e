import React from 'react'
import GoogleLoginButton from '../Components/GoogleLoginButton'

function SignIn(props){
    return (
        <div className="signin_container">
            <h1 className="title">not.e</h1>
            <GoogleLoginButton className="google_login" setIsAuth={props.setIsAuth} userPic={props.userPic}/>
        </div>
    )
}

export default SignIn
