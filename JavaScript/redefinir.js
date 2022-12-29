import { app, auth } from './fireBase.js'
import {sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
const getEmail = () =>{
    return document.getElementById("email").value
}

function redefinir() {
    sendPasswordResetEmail(auth, getEmail())
    .then(()=>{
        window.location.href = "/Login/login.html"
    })
    .catch(()=>{
        
    })
    
}
window.onload = () => {
    document.getElementById("redefinir").addEventListener('click', redefinir)
}