import React from 'react';
import Navbar from '../Components/Navbar';
import {database} from '../firebase_config';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router";
import { NavLink } from 'react-router-dom';
import background from '../assets/hand.jpeg';
import backgroundout from '../assets/hands.jpg';


const Login = () => {
    const navigate = useNavigate();
    const handlelogin = (event) => {
        event.preventDefault(); 
        console.log("login");
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!email || !password) {
            document.getElementById('error-message').innerText = 'Please enter both email and password';
            return;
        }
        else
        {
            signInWithEmailAndPassword(getAuth(), email, password)
            .then( async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                if(user.accessToken)
                {
                    const data={email: email, password: password}
                    console.log("data",data);
                    try {
                        const querySnapshot = await getDocs(collection(database, 'carereceivers'));
                        const ids = querySnapshot.docs.map(doc => doc.id);
                        console.log("ids",ids);
                        if(ids.includes(email))
                        {
                            navigate('/recieverprevdash',{state:{email}});
                            
                        }
                        else
                        {
                            
                            navigate('/gdash',{state:{email}});
                        }
                    } 
                    catch(e){
                        console.error("Error adding document: ", e);
                    }
                    
                }
            })
            .catch(() => {
                // const errorCode = error.code;
                const errorMessage = "invalid credentials";
                document.getElementById('error-message').innerText = errorMessage;
            });
        }

    }


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div style={styles.outer}>

            {/* <header style={styles.header}>
                <div className="title">
                    <h1>Meet My Helper</h1>
                </div>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}><a href="about.html">About</a></li>
                        <li style={styles.navItem}><a href="service.html">Services</a></li>
                        <li style={styles.navItem}><a href="#contact">Contact</a></li>
                        <li style={styles.navItem}><a href="login.html">Login</a></li>
                    </ul>
                </nav>
            </header> */}
            <section className="login-container" style={styles.loginContainer}>
                <h2 style={styles.heading}>Welcome to Meet My Helper</h2>
                <div className="error-message" id="error-message" style={styles.errorMessage}></div>
                <form className="login-form" id="login-form" style={styles.loginForm}>
                    <input type="text" id="email" placeholder="User ID" style={styles.input} />
                    <input type="password" id="password" placeholder="Password" style={styles.input} />
                    <div className="forgot-password">
                        <a href="/forgot" style={styles.forgotPassword}><i className="fas fa-question-circle"></i> Forgot Password?</a>
                    </div>
                    <button type='submit' onClick={handlelogin} style={styles.button}>Login</button>
                </form>
                {/* <button className="google-btn" onClick={() => window.location.href = 'choice.html'} style={styles.googleButton}>
                    <i className="fab fa-google"></i> Sign in with Google
                    
                </button> */}
                <div className="sign-up" style={styles.signUp}>
                <p>Don't have an account? <NavLink to="/register" style={styles.signUpLink}>Sign up</NavLink></p>
                </div>
            </section>
    </div>
            <footer style={styles.footer}>
                <p>&copy; 2024 Meet My Helper. All rights reserved.</p>
            </footer>
        </>
    );
}

export default Login;

const styles = {
    header: {
        backgroundColor: '#f0f0f0',
        // padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nav: {
        listStyleType: 'none',
    },
    navList: {
        display: 'flex',
    },
    navItem: {
        display: 'inline',
        marginRight: '20px',
    },
    loginContainer: {
        maxWidth: '400px',
        margin: '80px auto 0',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        // backgroundImage: `url(${background})`,
        position: 'relative',
        top: '80px',
        
    },
    heading: {
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        marginTop: '10px',
    },
    loginForm: {
        textAlign: 'left',
        marginTop: '20px',
        
    },
    input: {
        width: '90%',
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: 'lightgray',
        color: 'black',
        fontSize: '20px',
    },
    forgotPassword: {
        textAlign: 'left',
        marginBottom: '20px',
    },
    button: {
        width: '95%',
        padding: '10px',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    googleButton: {
        backgroundColor: '#dd4b39',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        marginTop: '10px',

    },
    signUp: {
        marginTop: '20px',
    },
    signUpLink: {
        display: 'inline-block',
    },
    footer: {
        backgroundColor: '#cef0ef',
        color: 'black',
        textAlign: 'center',
        // padding: '20px',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        // height:"20px",
        margin: '0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ul:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    li:{
        display: 'inline',
    },
    outer: {
       
        height: '85%',
        backgroundImage: `url(${backgroundout})` ,
        // backgroundSize: 'cover',
        position: 'relative',
        bottom: '90px',
        // left: '80px',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        // height: '100vh'
        
    },
    
};
