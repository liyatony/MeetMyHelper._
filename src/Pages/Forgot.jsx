import React from 'react';
import Navbar from '../Components/Navbar';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase_config';
import {message} from 'antd'
import prof2 from '../assets/prof2.jpeg';

const Forgot = () => {
    const handleForgotPassword = () => {
        console.log('Forgot password');
        // get form values
        const email = document.getElementById('email').value;
        console.log(email);
        sendPasswordResetEmail(auth, email)
  .then(() => {
    
    message.success('Password reset email sent!');
    message.success('Please check your email to reset your password!');
})
.catch((error) => {
    console.error(error);
    
    message.error('Error sending password reset email!');
  });
    };

    
    return (
        <div style={styles.outer}>
            <header>
                <Navbar/>
            </header>

            <section style={styles.sec}>
                <div style={styles.cont}>
                    
                <h2 style={styles.head}>Forgot Password</h2>
                <form  style={styles.form} className="forgot-password-form" action="reset_password.php" method="post">
                    <input style={styles.in} type="email" id="email" name="email" placeholder="Enter your email address" required />
                    <button  style={styles.btn} type="button" onClick={handleForgotPassword}>Reset Password</button>
                </form>
                </div>
            </section>

            <footer style={styles.footer}>
                <p>&copy; 2024 Meet My Helper. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Forgot;

const styles = {
    outer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(' + prof2 + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',

        height: '100vh',
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
    sec: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        
    },
    head: {
        textAlign: 'center',
        margin: '0',
        padding: '0',
        fontSize: '42px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px',
    },
    in: {
        margin: '10px',
        padding: '10px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #333',
        backgroundColor: '#cef0ef',
        color:'blue',
        fontSize: '20px',
        

    },
    btn: {
        margin: '10px',
        padding: '10px',
        width: '200px',
        borderRadius: '5px',
        border: '1px solid #333',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'black',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    cont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #333',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '5px',
        // backgroundColor: '#cef0ef',
        
        padding: '20px',
        position: 'relative',
        bottom: '35px',
        width:'30%'
    },

};