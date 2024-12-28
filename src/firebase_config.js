

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDS36XOCcY3iW9DJGf5x7r8l9VOb4w3YtQ",
    authDomain: "meetmyhelper.firebaseapp.com",
    projectId: "meetmyhelper",
    storageBucket: "meetmyhelper.appspot.com",
    messagingSenderId: "756519992578",
    appId: "1:756519992578:web:ff758a7d378255a140561b",
    measurementId: "G-PWJ403M3TL"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
