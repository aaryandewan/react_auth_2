import firebase from "firebase/app";
import "firebase/auth";

import "firebase/storage";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAFfFflQ6M1En2Xln217IQJBQSI4lJ6KIk",
  authDomain: "auth-dev2.firebaseapp.com",
  projectId: "auth-dev2",
  storageBucket: "auth-dev2.appspot.com",
  messagingSenderId: "381697537159",
  appId: "1:381697537159:web:6e36dadd7239115176f422",
});

export const auth = app.auth();
let projectStorage = firebase.storage();
let db = firebase.firestore();
export { db, projectStorage };
export default app;
