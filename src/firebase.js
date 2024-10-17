// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDvG_ALCmT1utrqOYWxyghxQH-AZowDeuc",
    authDomain: "da-pisos.firebaseapp.com",
    databaseURL: "https://da-pisos-default-rtdb.firebaseio.com",
    projectId: "da-pisos",
    storageBucket: "da-pisos.appspot.com",
    messagingSenderId: "23290252104",
    appId: "1:23290252104:web:61e74123381f018d77817d",
    measurementId: "G-BMWG8Q4NBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore and export it
