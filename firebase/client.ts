// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4ET1KNHWlgO5BoyyDqno4dPgL49z4Rv0",
    authDomain: "prepwise-b62a5.firebaseapp.com",
    projectId: "prepwise-b62a5",
    storageBucket: "prepwise-b62a5.firebasestorage.app",
    messagingSenderId: "212943607448",
    appId: "1:212943607448:web:dde4cea882e98c6d0f62ed",
    measurementId: "G-56JMM3CGTH"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app)
export const db = getFirestore(app)