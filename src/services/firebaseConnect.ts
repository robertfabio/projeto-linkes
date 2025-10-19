import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdYlLe6YITzbLLENuIV0WFENfz4U27glM",
  authDomain: "linkes-fabio.firebaseapp.com",
  projectId: "linkes-fabio",
  storageBucket: "linkes-fabio.firebasestorage.app",
  messagingSenderId: "428173937097",
  appId: "1:428173937097:web:6d19639af7e5dd1fb3c018"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };