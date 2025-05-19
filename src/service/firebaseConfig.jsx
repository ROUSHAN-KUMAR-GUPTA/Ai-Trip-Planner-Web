// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK_aov-yPvP-q7xs7FuHQL23h5l7dbTlk",
  authDomain: "trip-genius-45039.firebaseapp.com",
  projectId: "trip-genius-45039",
  storageBucket: "trip-genius-45039.firebasestorage.app",
  messagingSenderId: "247638175716",
  appId: "1:247638175716:web:5581da4d2e2209bcb9a1f1",
  measurementId: "G-DLGFLHLZ1V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);