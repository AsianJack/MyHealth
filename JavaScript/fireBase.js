import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBb7NzqriTnx9Yviv43JIoY4tX1eXdp6VQ",
    authDomain: "myhealth-af1ab.firebaseapp.com",
    projectId: "myhealth-af1ab",
    storageBucket: "myhealth-af1ab.appspot.com",
    messagingSenderId: "592404825609",
    appId: "1:592404825609:web:a1799aaac67169a9b29ad8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = initializeFirestore(app, {experimentalForceLongPolling: true})

const storage = getStorage(app)

export { app, auth, db, storage }