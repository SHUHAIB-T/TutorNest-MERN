// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDWUM9MqCf-MHztoY3Lniz6hcvCC6iYL1Q",
    authDomain: "tutornest-e37fc.firebaseapp.com",
    projectId: "tutornest-e37fc",
    storageBucket: "tutornest-e37fc.appspot.com",
    messagingSenderId: "771520280265",
    appId: "1:771520280265:web:8ac9ef099b096762cd3f18",
    measurementId: "G-SB8F0J14F1"
  };

// Initialize Firebase
export const firebase =  initializeApp(firebaseConfig)
export const firestore = getFirestore(firebase)
export const storage = getStorage(firebase)