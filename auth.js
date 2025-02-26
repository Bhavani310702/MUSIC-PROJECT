// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCTdimWZDlhBkSo3PS9LibjLjQ7r39Ya3I",
  authDomain: "music-fe209.firebaseapp.com",
  projectId: "music-fe209",
  storageBucket: "music-fe209.firebasestorage.app",
  messagingSenderId: "964978198575",
  appId: "1:964978198575:web:6ba3d4d61db3e10a0d1eda",
  measurementId: "G-EGSCHNET7V",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
