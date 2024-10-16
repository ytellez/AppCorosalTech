// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHIs14TbkNIrNcm0l7RPwNpD07tjBiKsM",
  authDomain: "appcorosaltech.firebaseapp.com",
  projectId: "appcorosaltech",
  storageBucket: "appcorosaltech.appspot.com",
  messagingSenderId: "632352505404",
  appId: "1:632352505404:web:c6e0091cb5a5c4e580cd39",
  measurementId: "G-QG8G2014RK"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const appFirebase = initializeApp(firebaseConfig);

export {appFirebase, firebase}
