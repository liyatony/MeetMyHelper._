import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router";

const choices = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log("state", state);
    return (
        <div style={styles.container}>
            <div className="circle" style={styles.circle}>
                <FontAwesomeIcon icon={faBriefcase} style={styles.icon} />
            </div>
            <button style={styles.button} onClick={() => navigate("/crp" ,{state:{state}})}>Get Care</button>
            <div className="circle" style={styles.circle}>
                <FontAwesomeIcon icon={faUser} style={styles.icon} />
            </div>
            <button style={styles.button} onClick={() =>navigate("/cgp",{state:{state}}) }>Get Job</button>
        </div>
    );
}

export default choices;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    circle: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: 'lightslategrey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    icon: {
        fontSize: '80px',
        color: '#fff',
    },
    button: {
        fontSize: '18px',
        color: '#fff',
        backgroundColor: 'darkblue',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
    }
};
