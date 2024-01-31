// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAWW2sITK9vHo8_m0M9YihrQIgA-5xlPDY",
    authDomain: "market-palce.firebaseapp.com",
    projectId: "market-palce",
    storageBucket: "market-palce.appspot.com",
    messagingSenderId: "7181060143",
    appId: "1:7181060143:web:e6f2190d6b6e8e27479eda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();