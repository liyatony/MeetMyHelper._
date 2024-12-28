const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyBnpTT6OVfbHaXQsa_kQHrXtreNFV6lsc8",
    authDomain: "auth-form-c7538.firebaseapp.com",
    projectId: "auth-form-c7538",
    storageBucket: "auth-form-c7538.appspot.com",
    messagingSenderId: "574180938801",
    appId: "1:574180938801:web:ce273752e390970024b110"
 });
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const signUp=()=>{
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    console.log(email,password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((result) => {
    // Signed in 
    console.log("You are signed up");
    console.log(result)
  })
  .catch((error) => {
    console.log(error.code)
    console.log(error.message)
    // ..
  });
}