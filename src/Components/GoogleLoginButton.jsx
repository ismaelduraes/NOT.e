import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'

function GoogleLoginButton(props){

    function signInWithGoogle(){
        signInWithPopup(auth, provider).then((res) => {
            // console.log(res)
            // props.setIsAuth(true)
        }).catch(err => {alert(`Algo deu errado e não foi possível entrar: ${err}`)})
    }


    return (
        <div className="login" onClick={signInWithGoogle}>
            <FcGoogle size={24}/>
            <p>Entrar com o Google</p>
        </div>
    )
}

export default GoogleLoginButton