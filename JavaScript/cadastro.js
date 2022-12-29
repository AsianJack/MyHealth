import { app, auth } from './fireBase.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"

const getEmail = () => {
    return document.getElementById("email").value
}
const getSenha = () => {
    return document.getElementById("primeiro").value
}

function cadastrar() {
    var senha = getSenha()
    var senhareptida = document.getElementById("segundo").value
    if (senha == "" || senhareptida == "") {
        alert("Os campos senha e repetir senha não podem estar vazias")
    } else if (senha === senhareptida) {

        createUserWithEmailAndPassword(auth, getEmail(), senha)
            .then((user) => {//quando a gente chama um servidor é necessario usar o then pois as requisiçoes sao assincronas n sabemos o tempo de resposta
                window.location.href = "/Login/login.html"
            })
            .catch((error) => {
                console.log(error.message)
            })

    } else {
        document.getElementById("nao").style.display = "flex"
    }
}

window.onload = () => {
    const myhealth = document.getElementsByClassName("luisao")[0]
    myhealth.addEventListener("click", (event) => {
        window.location.href = "/Index/index.html"
    })
    document.getElementById("confirmar").addEventListener('click', cadastrar)

}