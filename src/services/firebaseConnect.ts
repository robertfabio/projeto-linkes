import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const env = import.meta.env as Record<string, string | undefined>;

const apiKey = env.VITE_FIREBASE_API_KEY;
const authDomain = env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = env.VITE_FIREBASE_APP_ID;

if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
  throw new Error(
    'Missing Firebase configuration. Please add the required VITE_FIREBASE_* variables to your .env file (see .env.example).'
  );
}

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
