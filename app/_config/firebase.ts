// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDyUxsRICXiyfOppNJamK4AKwgdTXnTDsQ",
    authDomain: "chat-19189.firebaseapp.com",
    projectId: "chat-19189",
    storageBucket: "chat-19189.appspot.com",
    messagingSenderId: "633053870372",
    appId: "1:633053870372:web:d5b0b7a1b621273bc79bb1",
    measurementId: "G-T1BSDKWW5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore()
export const storage = getStorage(app);