// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  apiKey: "AIzaSyAuCvnDminXPMszWioVCXt_GuraNak2rOg",
  authDomain: "bills-adef6.firebaseapp.com",
  projectId: "bills-adef6",
  storageBucket: "bills-adef6.appspot.com",
  messagingSenderId: "143764872912",
  appId: "1:143764872912:web:7c3164eff7a96ee83388d5"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore (app);
const storage = getStorage (app);

export {db, storage}