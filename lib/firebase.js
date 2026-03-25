import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuqVUdX5xxtpJpeJgM0mMkzAACZbz88Tk",
  authDomain: "bike-tel-sondhan.firebaseapp.com",
  projectId: "bike-tel-sondhan",
  storageBucket: "bike-tel-sondhan.firebasestorage.app",
  messagingSenderId: "938085076432",
  appId: "1:938085076432:web:298512e792e440b74c3dd5"
};

// 🔥 IMPORTANT (avoid re-init error)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Use Firestore (your app needs this)
export const db = getFirestore(app);
