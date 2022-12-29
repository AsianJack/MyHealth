import { app, auth } from '/JavaScript/fireBase.js'
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"

const getEmail = () => {
    return document.getElementById("email").value
}

const getSenha = () => {
    return document.getElementById("senha").value
}

const logar = () => {
    signInWithEmailAndPassword(auth, getEmail(), getSenha())
        .then((user) => {
            window.location.href = "/Home/home.html"
        })
        .catch((error) => {
            document.getElementsByClassName("pzao")[0].style.display = "flex"
        })
}
window.onload = () => {
    document.getElementById("entrar").addEventListener('click', logar)
}