// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firestore from '@react-native-firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_Tib1quUtJWYH7jKUx34r15FP3tLgWeE",
    authDomain: "faceboo-expo.firebaseapp.com",
    projectId: "faceboo-expo",
    storageBucket: "faceboo-expo.firebasestorage.app",
    messagingSenderId: "1035299765495",
    appId: "1:1035299765495:web:02e2918da01e8ad56467f2",
    measurementId: "G-QP2KVM9G9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;