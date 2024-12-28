import React from 'react';
import { Button } from 'antd';
import { useNavigate } from "react-router";

const Review_profile = ({ giverdet, myem ,mydet}) => {
    const navigate = useNavigate();
    
    return (
        <div style={styles.outer}>
            <div style={styles.nameapo}>
                <h1 style={styles.heading}>{giverdet.fullName}</h1>
                <Button onClick={() => navigate('/appoint', { state: { myem,myname:mydet.name,myimage:mydet.imageurl ,giverdetEmail: giverdet.email,giverdetimage:giverdet.imageUrl,giverdetname:giverdet.fullName } })} style={styles.abtn}>Assign CareTaker</Button>
            </div>
            <div style={styles.imageBox}>
                <img src={giverdet.imageUrl ? giverdet.imageUrl : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="Profile" style={styles.image} />
            </div>
            <div style={styles.infoBox}>
                <div style={styles.label}>Age:</div>
                <div style={styles.value}>{giverdet.age}</div>
            </div>
            <div style={styles.infoBox}>
                <div style={styles.label}>Contact Number:</div>
                <div style={styles.value}>{giverdet.contactNumber}</div>
            </div>
            <div style={styles.infoBox}>
                <div style={styles.label}>Experience:</div>
                <div style={styles.value}>{giverdet.servicesOffered}</div>
            </div>
            <div style={styles.infoBox}>
                <div style={styles.label}>Availability:</div>
                <div style={styles.value}>{giverdet.availability}</div>
            </div>
            <div style={styles.infoBox}>
                <div style={styles.label}>Qualification:</div>
                <div style={styles.value}>{giverdet.qualification}</div>
            </div>
            <div style={styles.infoBox}>
                <div style={styles.label}>Services:</div>
                <div style={styles.value}>{giverdet.servicesOffered}</div>
            </div>
        </div>
    );
}

const styles = {
    outer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        width: '80%',
        // backgroundColor: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        marginTop: '20px',
        boxShadow: '0 0 20px #ccc',
    },
    heading: {
        // marginBottom: '20px',
        
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%',
        marginBottom: '10px',
    },
    label: {
        fontWeight: 'bold',
        marginRight: '10px',
        width: '100%',
        display: 'flex',
        position: 'relative',
        left: '0',
        fontSize: '20px',
    },
    value: {
        border: '1px solid #ccc',
        padding: '5px',
        borderRadius: '5px',
        width: '100%',
        backgroundColor: '#f5f5f5',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    imageBox: {
        // marginTop: '20px',
        marginBottom: '20px',
    },
    image: {
        borderRadius: '80%',
        height: '150px',
    },
    nameapo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        height: '90px',
        // marginBottom: '10px',
    },
    abtn: {
        backgroundColor: 'grey',
        color: 'white',
        borderRadius: '9px',
        padding: '5px',
        marginTop: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        height: '40px',
        width: '40%',
        cursor: 'pointer',
        marginLeft: '70px',
    }
};

export default Review_profile;
