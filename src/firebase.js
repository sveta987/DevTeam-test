// src.firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA_EdaXKzEQ_Yg1YnAl8ikzQDooFirlTis",
    authDomain: "interview-5ac2c.firebaseapp.com",
    projectId: "interview-5ac2c",
}

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

export {auth}