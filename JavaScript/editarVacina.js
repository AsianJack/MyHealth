import { db, storage } from './fireBase.js'
import { addDoc, getDoc, doc, updateDoc, deleteDoc, query, collection, onSnapshot, where } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { uploadBytes, ref, getDownloadURL, deleteObject, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
let vacina = []
let id
var url
var file = null;
var pathFoto = null;

function logout() {
    window.location.href = "/Index/index.html"
}
function minhasvacinas() {
    window.location.href = "/Home/home.html"
}
function excluir() {
    var excluir = document.getElementById("popup")
    excluir.style.display = "flex"
}
function popcancelar() {
    var cancelar = document.getElementById("popup")
    cancelar.style.display = "none"
    window.location.href = "/Home/home.html"
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
    return document.getElementById("proximavacina").value
}

const setBox = (lista) => {
    lista.forEach((vacina) => {
        document.getElementById("datavacina").value = vacina.diavacina
        document.getElementById("vacina").value = vacina.vacina
        if (vacina.dose == "1a. dose") {
            document.getElementsByClassName("ponto")[0].checked = true
        } else if (vacina.dose == "2a. dose") {
            document.getElementsByClassName("ponto")[1].checked = true
        } else if (vacina.dose == "3a. dose") {
            document.getElementsByClassName("ponto")[2].checked = true
        } else if (vacina.dose == "Reforço") {
            document.getElementsByClassName("ponto")[3].checked = true
        } else if (vacina.dose == "Dose Única") {
            document.getElementsByClassName("ponto")[4].checked = true
        }
        document.getElementById("imgvacina").src = vacina.urlimagen
        document.getElementById("proximavacina").value = vacina.proximavacina
        pathFoto = vacina.pathFoto
        url = vacina.urlimagen
    })

}
const editar = () => {
    if (file) {

        const uploadTask = uploadBytesResumable(ref(storage, pathFoto), file)

        uploadTask.on('state_changed',
            () => {
                getDownloadURL(ref(storage, pathFoto))
                .then((url)=>{
                    updateDoc(doc(db, "vacinas", id), {
                        vacina: getVacina(),
                        diavacina: getDataVacina(),
                        dose: getDose(),
                        urlimagen: url,
                        pathFoto: pathFoto,
                        proximavacina: getPorixmaVac()
                    })
                        .then(() => {
                            window.location.href = "/Home/home.html"
                        })
                        .catch((error) => {
                            console.log("Erro ao atualizar o documento: " + error)
                        })
                        .finally(() => {
                            showBtnSalvando(false)
                        })
                })
                
            }
        )
    } else {
        updateDoc(doc(db, "vacinas", id), {
            vacina: getVacina(),
                    diavacina: getDataVacina(),
                    dose: getDose(),
                    urlimagen: url,
                    pathFoto: pathFoto,
                    proximavacina: getPorixmaVac()
        })
            .then(() => {
                window.location.href = "/Home/home.html"
            })
            .catch((error) => {
                console.log("Erro ao atualizar o documento: " + error)
            })
            .finally(() => {
                showBtnSalvando(false)
            })
    }
}

const popsim = () => {
    deleteObject(ref(storage, pathFoto))
        .then(() => {
            console.log("Arquivo excluído com sucesso.")
            deleteDoc(doc(db, "vacinas", id))
                .then(() => {
                    window.location.href = "/Home/home.html"
                })
                .catch((error) => {
                    console.log("Erro ao excluir documento: " + error)
                })
        })
        .catch((error) => {
            console.log("Erro ao excluir o arquivo.")
        })
}



window.onload = () => {
    id = localStorage.getItem('valor')
    if (id) {

        getDoc(doc(db, "vacinas", id))
            .then((documento) => {
                vacina.push({
                    id: documento.id,
                    vacina: documento.data().vacina,
                    diavacina: documento.data().diavacina,
                    dose: documento.data().dose,
                    urlimagen: documento.data().urlimagen,
                    pathFoto: documento.data().pathFoto,
                    proximavacina: documento.data().proximavacina
                })
                setBox(vacina)
                // getById("imagem").src = getUrlFoto()
            })
            .catch((error) => {
                console.log("Erro ao recuperar o documento: " + error)
            })



    }

    document.getElementById("minhavacinas").addEventListener('click', minhasvacinas)
    document.getElementById("logout").addEventListener('click', logout)
    document.getElementById("excluir").addEventListener('click', excluir)
    document.getElementById("editar").addEventListener('click', editar)
    document.getElementById("sim").addEventListener('click', popsim)
    document.getElementById("cancelar").addEventListener('click', popcancelar)
    document.getElementById("imagem").addEventListener('change', function (event) {
        file = event.target.files[0]
        document.getElementById("imgvacina").src = URL.createObjectURL(file)
    })
}