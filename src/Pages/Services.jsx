import React from 'react';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faHands, faUserNurse } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
    
  return (
    <>
      <header style={{height:'9vh'}}>
       <Navbar/>
      </header>

      <h1 style={{ textAlign: 'center' }}>Our Services</h1>

      <section id="services" style={styles.services}>
        <div className="service-box" style={styles.serviceBox}>
          <FontAwesomeIcon icon={faHeart} className="service-icon" style={styles.serviceIcon} />
          <h2 className="service-title" style={styles.serviceTitle}>Compassionate Care</h2>
          <p className="service-description" style={styles.serviceDescription}>We provide compassionate care tailored to the unique needs of each individual.</p>
        </div>
        <div className="service-box" style={styles.serviceBox}>
          <FontAwesomeIcon icon={faClock} className="service-icon" style={styles.serviceIcon} />
          <h2 className="service-title" style={styles.serviceTitle}>24/7 Assistance</h2>
          <p className="service-description" style={styles.serviceDescription}>Our team is available around the clock to provide assistance whenever you need it.</p>
        </div>
        <div className="service-box" style={styles.serviceBox}>
          <FontAwesomeIcon icon={faHands} className="service-icon" style={styles.serviceIcon} />
          <h2 className="service-title" style={styles.serviceTitle}>Personalized Support</h2>
          <p className="service-description" style={styles.serviceDescription}>We offer personalized support to ensure that your specific needs are met with care and attention.</p>
        </div>
        <div className="service-box" style={styles.serviceBox}>
          <FontAwesomeIcon icon={faUserNurse} className="service-icon" style={styles.serviceIcon} />
          <h2 className="service-title" style={styles.serviceTitle}>Skilled Caregivers</h2>
          <p className="service-description" style={styles.serviceDescription}>Our skilled caregivers are trained professionals dedicated to providing top-quality care and support.</p>
        </div>
      </section>
      <footer style={styles.footer}>
                <p>&copy; 2024 Meet My Helper. All rights reserved.</p>
            </footer>
    </>
  );
}

export default Services;

const styles = {
    services: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '10px 20px',
      textAlign: 'center',
      width:'80%',
      margin:'auto'
    },
    serviceBox: {
      display: 'inline-block',
      width: '320px',
      margin: '10px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      height: '26vh',
      flexWrap: 'wrap',
      padding:'10px',
      
      
    },
    serviceIcon: {
      fontSize: '36px',
      color: '#333',
    //   margin: '20px 0',
    },
    serviceTitle: {
      fontSize: '20px',
      marginBottom: '10px',
    },
    serviceDescription: {
      margin: '0 20px 20px',
      fontSize: '16px',
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
  };
  
