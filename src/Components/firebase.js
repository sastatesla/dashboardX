// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyBeav6mwMVL2BGknfBCQLt-_2Rw0NKVmEk",
  authDomain: "fiddle-dashboard.firebaseapp.com",
  databaseURL: "https://fiddle-dashboard-default-rtdb.firebaseio.com",
  projectId: "fiddle-dashboard",
  storageBucket: "fiddle-dashboard.appspot.com",
  messagingSenderId: "65046435487",
  appId: "1:65046435487:web:32bab9cef57e9fddaab4aa",
  measurementId: "G-TVTPQ5PXW7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { app, storage,auth, db, signInWithEmailAndPassword, onAuthStateChanged, collection, getDocs, ref, getDownloadURL };


