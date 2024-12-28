import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink and navigate
import { signOut } from 'firebase/auth';
import { auth } from '../firebase_config';
import { message } from 'antd';
import logo from '../assets/log.png';

function Navbar() {
  const navigate = useNavigate(); // Get navigate function from the hook

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        message.success('Logout successful'); // Show success message
      })
      .catch((error) => {
        console.error(error);
      });

    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.title}>
        <img src={logo} alt="logo" style={styles.logo} />
        <h1>Meet My Helper</h1>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li>
            <NavLink to="/" style={styles.link} activeStyle={styles.activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" style={styles.link} activeStyle={styles.activeLink}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" style={styles.link} activeStyle={styles.activeLink}>
              Services
            </NavLink>
          </li>
          <li>
            {/* <NavLink to="/contact" style={styles.link} activeStyle={styles.activeLink}>
              Contact
            </NavLink> */}
          </li>
          <li>
            <NavLink to="/login" style={styles.link} activeStyle={styles.activeLink}>
              Login
            </NavLink>
          </li>
          {/* <li><button onClick={handleLogout} style={styles.link}>Logout</button></li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

const styles = {
  header: {
    backgroundColor: '#cef0ef',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    margin: '0',
    padding: '0 1rem',
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logo: {
    width: '50px', 
    height:"50px",
    marginRight: '10px', // Add margin between logo and text
    borderRadius: '50%', // Make the logo round
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'normal',
    padding: '0.5rem 1rem',
    transition: 'color 0.3s ease',
  },
  activeLink: {
    color: 'lightblue', // Change color for active link
  },
  ul: {
    display: 'flex',
    listStyle: 'none',
    marginRight: '1rem',
  },
};
