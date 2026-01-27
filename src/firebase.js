// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbQmKVBWgYJ2-0QqqhgSK91CQXQ9-AZuw",
  authDomain: "my-app-d640f.firebaseapp.com",
  projectId: "my-app-d640f",
  storageBucket: "my-app-d640f.firebasestorage.app",
  messagingSenderId: "51052815563",
  appId: "1:51052815563:web:63fd759e022547d6afa74e",
  measurementId: "G-GGZVTS1KWX",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
