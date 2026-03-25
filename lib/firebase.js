// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuqVUdX5xxtpJpeJgM0mMkzAACZbz88Tk",
  authDomain: "bike-tel-sondhan.firebaseapp.com",
  projectId: "bike-tel-sondhan",
  storageBucket: "bike-tel-sondhan.firebasestorage.app",
  messagingSenderId: "938085076432",
  appId: "1:938085076432:web:298512e792e440b74c3dd5",
  measurementId: "G-F3JHS249GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);