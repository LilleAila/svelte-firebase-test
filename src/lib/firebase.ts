import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrVN6S1YawobYIlYM2YrsyWm40pIP2CBE",
  authDomain: "svelte-fireship-49968.firebaseapp.com",
  projectId: "svelte-fireship-49968",
  storageBucket: "svelte-fireship-49968.appspot.com",
  messagingSenderId: "925760253459",
  appId: "1:925760253459:web:15467e38580af2854559e6",
  measurementId: "G-2EGWYC8QQY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();