// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1pOxGyZ_IscVZa7grH48gfR-3QvXIFMw",
  authDomain: "presih-ef765.firebaseapp.com",
  projectId: "presih-ef765",
  storageBucket: "presih-ef765.appspot.com",
  messagingSenderId: "484270617243",
  appId: "1:484270617243:web:133a585d7ba1f324dccc3e",
  measurementId: "G-YLPC84BVXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);