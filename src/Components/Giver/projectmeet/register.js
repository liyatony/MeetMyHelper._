// Import Firebase SDK
import firebase from 'firebase/app';
import 'firebase/auth'; // Import authentication module if you're using authentication

// Your Firebase config

const firebaseConfig = {
  apiKey: "AIzaSyBIwqy3LUzOK5KXJmtPYBvCbXF5QMcWDvI",
  authDomain: "meetmyhelper-aea5f.firebaseapp.com",
  projectId: "meetmyhelper-aea5f",
  storageBucket: "meetmyhelper-aea5f.appspot.com",
  messagingSenderId: "910360998110",
  appId: "1:910360998110:web:450c8012ec1816e9a2124f"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
