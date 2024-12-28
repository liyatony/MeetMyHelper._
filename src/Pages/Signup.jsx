import React, { useState } from 'react';
import background from '../assets/carepic.jpg';
import { auth } from '../firebase_config';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { useNavigate } from "react-router";
import Navbar from '../Components/Navbar';
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async(e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    // console.log('Sign up with:', email, password);
    else
    {
      try{
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
          const user = userCredential.user;
          // console.log(user);
          if(user.accessToken)
          {

            const data={email: email, password: password}
            navigate("/choices" ,{state:{data}} );
            setErrorMessage('');
          }
          
        })
      }
      catch(error){
        console.log(error.message);
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <>
       <div>
                <Navbar />
            </div>

      <section style={styles.signupContainer}>
        {errorMessage && <div style={styles.ermsg}>{errorMessage}</div>}
        <h2 style={{color:'black'}}>Sign Up</h2>
        <form style={styles.form} className="signup-form" onSubmit={handleSignUp}>
          <input type="text" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          <button type="submit" onClick={handleSignUp} style={styles.button}>Sign Up</button>
        </form>
      </section>

      <footer style={styles.footer}>
                <p>&copy; 2024 Meet My Helper. All rights reserved.</p>
            </footer>
    </>
  );
};

export default SignUp;

const styles = {
  header: {
    backgroundColor: '#333',
    // padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    height:'10vh'
  },
  title: {
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    listStyle: 'none',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: '2rem',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover', // Cover the entire background
    backgroundPosition: 'center ' ,
    
    height: '80%', // Full height minus the header height
  },
  input: {
    width: '100%',
    marginBottom: '20px',
    // padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    height: '5vh',
    fontSize: '20px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  footer: {
    backgroundColor: '#cef0ef',
    color: 'black',
    textAlign: 'center',
    
    position: 'absolute',
    bottom: '0',
    width: '100%',
    
    margin: '0',
    justifyContent: 'center',
    alignItems: 'center',
},
  ermsg: {
    color: 'red',
    marginBottom: '20px',
    textAlign: 'center',
    // backgroundColor: 'lightgrey',
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  form: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    // backdropFilter: 'blur(-50px)',
    marginTop: '60px',
  },
};
