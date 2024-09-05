// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-clone-a1487.firebaseapp.com",
  projectId: "netflix-clone-a1487",
  storageBucket: "netflix-clone-a1487.appspot.com",
  messagingSenderId: "284160949083",
  appId: "1:284160949083:web:181a37e726614eadbf387e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
