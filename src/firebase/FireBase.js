// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5YawGdNhH4jc-5NZec0yFKFI4lmnuCQI",
    authDomain: "thingstodoo-919af.firebaseapp.com",
    projectId: "thingstodoo-919af",
    storageBucket: "thingstodoo-919af.appspot.com",
    messagingSenderId: "1013191508645",
    appId: "1:1013191508645:web:7d4c22b1a7a780ee7fc34c",
    measurementId: "G-PN6C34XTW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);