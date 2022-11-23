// import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA7PjbFYCKFyZsyd2k7PCxa9X_zOAosgIk",
    authDomain: "todoreact-b83c8.firebaseapp.com",
    projectId: "todoreact-b83c8",
    storageBucket: "todoreact-b83c8.appspot.com",
    messagingSenderId: "731264959810",
    appId: "1:731264959810:web:834cb9ba834745f5d134db",
    measurementId: "G-Z3ZDY5G2SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
