import { db, storage } from './fireBase.js'
import { app, auth } from './fireBase.js'
import { signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { uploadBytes, ref, getDownloadURL, deleteObject, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

var file = null;
const uid = () => {
    const id = Date.now().toString(16) + Math.random().toString(16)
    return id.replace(/\./g, '')
}
const getDataVacina = () => {
    return document.getElementById("datavacina").value
}
const getVacina = () => {
    return document.getElementById("vacina").value
}

const getDose = () => {
    return document.querySelector('input[name="sexo"]:checked').value
}

const getUrl = () => {
    return document.getElementById("imagem").value
}
const getPorixmaVac = () => {
    return document.getElementById("proximavac").value
}

function cadastrar() {
    const fileRef = "imagens/" + uid()
    uploadBytes(ref(storage, fileRef), file)
        .then((result) => {
            console.log("Arquivo enviado com sucesso: " + result)
            getDownloadURL(ref(storage, fileRef))
                .then((url) => {
                    
                    addDoc(collection(db, "vacinas"), {
                        vacina: getVacina(),
                        diavacina: getDataVacina(),
                        dose: getDose(),
                        urlimagen: url,
                        pathFoto: fileRef,
                        proximavacina: getPorixmaVac(),
                        userid: auth.currentUser.uid
                    })
                        .then((result) => {
                            window.location.href = "../Home/Home.html"
                        })
                        .catch((error) => {
                            console.log("Erro ao persistir dados: " + error)
                        })
                })
                .catch((error) => {
                    console.log("Erro ao recuperar URL de download: " + error)
                })
        })
        .catch((error) => {
            console.log("Erro ao enviar arquivo: " + error)
        })
}

function logout() {
    signOut(auth)
    window.location.href = "/Index/index.html"
}

function voltar() {
    window.location.href = "/Home/home.html"
}
auth.onAuthStateChanged(function (user) {
    if (!auth.currentUser) {
        window.location.href = "/Login/login.html"
    }
})
window.onload = () => {
    document.getElementById("home").addEventListener('click', voltar)
    document.getElementById("deslogar").addEventListener('click', logout)
    document.getElementById("cadastrar").addEventListener('click', cadastrar)
    document.getElementById("imagem").addEventListener('change', function (event) {
        file = event.target.files[0]
        document.getElementById("imgvacina").src = URL.createObjectURL(file)
    })
}