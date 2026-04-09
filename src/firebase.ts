import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBT1P1wFVOJcc5GvvkRuy8Jax5666ejKFg",
  authDomain: "medage-app-verify.firebaseapp.com",
  projectId: "medage-app-verify",
  storageBucket: "medage-app-verify.firebasestorage.app",
  messagingSenderId: "606999665243",
  appId: "1:606999665243:web:b74eef5d8c5830e544bd7e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
