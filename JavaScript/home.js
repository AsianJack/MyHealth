import { app, auth } from './fireBase.js'
import { signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { db } from './fireBase.js'
import { query, collection, onSnapshot, where } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

auth.onAuthStateChanged(function (user) {
    if (!auth.currentUser) {
        window.location.href = "/Login/login.html"
    }
})
const vacina = []
function novavacina() {
    window.location.href = "/NovaVacina/novavacina.html"
}
function minhasvacinas() {
    window.location.href = "/Home/home.html"
}
function logout() {
    signOut(auth)
    window.location.href = "/Index/index.html"
}
function editar(id) {
    localStorage.setItem("valor", id)
    window.location.href = "/EditarVacina/editar.html"
}

function getVacinas(user) {
    let box = document.getElementsByClassName("grid")[0]
    const vacaux = collection(db, "vacinas")
    const q = query(vacaux, where("userid", "==", user.uid));
    onSnapshot(q, (results) => {
        results.forEach((documento) => {
            vacina.push({
                id: documento.id,
                vacina: documento.data().vacina,
                diavacina: documento.data().diavacina,
                dose: documento.data().dose,
                urlimagen: documento.data().urlimagen,
                proximavacina: documento.data().proximavacina
            })
        });
        box = listaVacinas(vacina)
    })
}

function listaVacinas(lista) {
    document.getElementsByClassName("grid")[0].innerHTML = ""
    let box = document.getElementsByClassName("grid")[0]
    lista.forEach((documento) => {
        box.appendChild(getGrid(documento.vacina, documento.dose, documento.diavacina, documento.urlimagen, documento.proximavacina, documento.id))
        return box
    })
}

const pesquisar = () => {
    const pesquisa = document.getElementById("pesquisa").value.trim()
    listaVacinas(vacina.filter(documento => documento.vacina.toLowerCase().includes(pesquisa.toLowerCase())))
}

function getGrid(vacina, dose, dia, imagem, proxima, id) {

    const gridbox = document.createElement("div")
    gridbox.classList.add("grid-box")

    const nome = document.createElement("span")
    nome.classList.add("nome")

    const tipodose = document.createElement("span")
    tipodose.classList.add("dose")

    const data = document.createElement("span")
    data.classList.add("data")

    const img = document.createElement("img")
    img.classList.add("imgvacina")

    const proximadata = document.createElement("span")

    const divproxima = document.createElement("div")
    divproxima.classList.add("proximadose")

    nome.innerHTML = vacina
    tipodose.innerHTML = dose
    data.innerHTML = dia
    img.src = imagem
    proximadata.innerHTML = "Proxima dose em: " + proxima

    gridbox.onclick = () => editar(id)//aqui eu irei acrescentar o onclick e mandar utilizar a funcao editar
    gridbox.appendChild(nome)
    gridbox.appendChild(tipodose)
    gridbox.appendChild(data)
    gridbox.appendChild(img)
    divproxima.appendChild(proximadata)
    gridbox.appendChild(divproxima)

    return gridbox
}

window.onload = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            getVacinas(user)
        }
    })

    document.getElementById("pesquisa").addEventListener('keyup', pesquisar)
    document.getElementById("novavacina").addEventListener('click', novavacina)
    document.getElementById("minhasvacinas").addEventListener('click', minhasvacinas)
    document.getElementById("deslogar").addEventListener('click', logout)
}