
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC-AR6FIR1NKmHhnC7BbKDo-XwxxJOaNAI",
    authDomain: "ecelldb.firebaseapp.com",
    projectId: "ecelldb",
    storageBucket: "ecelldb.appspot.com",
    messagingSenderId: "1046389061725",
    appId: "1:1046389061725:web:4402dd6a420f1a4c1535b4",
    measurementId: "G-6D3XBF6BQJ"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);