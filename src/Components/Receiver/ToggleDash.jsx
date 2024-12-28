import React, { useState, useEffect } from 'react';
import { database } from '../../firebase_config';
import { collection, onSnapshot, where } from 'firebase/firestore';
import back from '../../assets/back.png'
const ToggleDash = ({ myemail }) => {
    const [meds, setMeds] = useState([]); // State to store medicines
    const [exercises, setExercises] = useState([]); // State to store exercises
    const [healthData, setHealthData] = useState([]);

    // Fetch medicines from the database
    const fetchMedicine = async () => {
        try {
            const unsubscribe = await onSnapshot(collection(database, 'medicines'), where("recievermail", "==", myemail), (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    arr.push(doc.data());
                });
                setMeds(arr);
            });
            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }

    // Fetch exercises from the database
    const fetchExercises = async () => {
        try {
            const unsubscribe = await onSnapshot(collection(database, 'exercises'), where("recievermail", "==", myemail), (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    arr.push(doc.data());
                });
                setExercises(arr);
            });
            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }

    // Fetch health data from the database
    const fetchHealthData = async () => {
        try {
            const unsubscribe = await onSnapshot(collection(database, 'healthdata'), where("recievermail", "==", myemail), (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    arr.push(doc.data());
                });
                setHealthData(arr);
            });
            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchMedicine();
        fetchExercises();
        fetchHealthData();
    }, []);

    return (
        <div style={styles.outer}>
            <div style={styles.upper}>
                <div style={styles.left}>
                    <div style={styles.head}>
                        <div style={styles.name}>Medicines Taken</div>
                    </div>

                    <div style={styles.leftbody}>
                        <div style={styles.horizontalscroll}>
                            {meds.map((med, index) => (
                                <div style={styles.medcard} key={index}>
                                    <div style={styles.cardhead}>
                                    
                                    <label style={styles.headlabel}>Taker Name</label>
                                        <div style={styles.headvalue}>{med.givername}</div>
                                    
                                </div>
                                    <div style={styles.field}>
                                        <label style={styles.label}>Medicine Name</label>
                                        <div style={styles.value}>{med.medname}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label}>Dosage</label>
                                        <div style={styles.value}>{med.dosage}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label}>Time</label>
                                        <div style={styles.value}>{med.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={styles.right}>
                    <div style={styles.head}>
                        <div style={styles.name}>Exercises Done</div>
                    </div>

                    <div style={styles.rightbody}>
                        <div style={styles.horizontalscroll}>
                            {exercises.map((exercise, index) => (
                                <div style={styles.exercisecard} key={index}>
                                    <div style={styles.cardhead}>
                                    <label style={styles.headlabel}>Taker Name</label>
                                        <div style={styles.headvalue}>{exercise.givername}</div>
                                        
                                    
                                </div>
                                    <div style={styles.field}>
                                        <label style={styles.label}>Exercise Name</label>
                                        <div style={styles.value}>{exercise.exerciseName}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label}>Duration</label>
                                        <div style={styles.value}>{exercise.duration}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label}>Date</label>
                                        <div style={styles.value}>{exercise.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={styles.lower}>
                <div style={styles.head}>
                    <div style={styles.name}>Health Datas</div>
                </div>
                <div style={styles.lowerbody}>
                    <div style={styles.horizontalscroll}>
                        {healthData.map((data, index) => (
                            <div style={styles.medcard} key={index}>
                                <div style={styles.cardhead}>
                                    
                                <label style={styles.headlabel}>Taker Name</label>
                                        <div style={styles.headvalue}>{data.givername}</div>
                                    
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Blood Pressure</label>
                                    <div style={styles.value}>{data.bloodPressure}</div>
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Sugar Level</label>
                                    <div style={styles.value}>{data.sugarLevel}</div>
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Weight</label>
                                    <div style={styles.value}>{data.weight}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToggleDash;

const styles ={
    outer:{
        display:'flex',
        flexDirection:'column',
        height:'100%',
        width:'97%',
        backgroundImage:'url('+back+')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
    },
    upper:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        height:'50%',
        padding:'8px',
    },
    left:{
        display:'flex',
        flexDirection:'column',
        width:'50%',
        height:'100%',
        backgroundColor:'rgba(255,255,255,0.5)',
        borderRadius:'10px',
        marginRight:'15px',
    },
    right:{
        display:'flex',
        flexDirection:'column',
        width:'47%',
        height:'100%',
        backgroundColor:'rgba(255,255,255,0.5)',
        borderRadius:'10px',
        // padding:'5px',
    },
    lower:{
        display:'flex',
        flexDirection:'column',
        width:'99%',
        height:'46%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding:'5px',
    },
    head:{
        display:'flex',
        flexDirection:'row',
        width:'98%',
        borderRadius:'10px',
        height:'10%',
        backgroundColor:'rgba(255,255,255,0.1)',
        padding:'5px',
    },
    plusbtn:{
        display:'flex',
        width:'40px',
        height:'30px',
        backgroundColor:'purple',
        position:'relative',
        left:'90%',
        top:"-20%",
        alignItems:'center',
        justifyContent:'center',
        fontSize:'90px',
        paddingBottom:'20px',
        borderRadius:'50%',
        color:'white',
        cursor:'pointer',
    },
    name:{
        display:'flex',
        flexDirection:'row',
        width:'60%',
        height:'100%',
        // backgroundColor:'white',
        color:'#25203b',
        paddingBottom:'25px',
        fontSize:'30px',
        fontWeight:'bold',
        alignItems:'center',
    },
    // Modal styles
    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black backdrop
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
    },
    closebtn: {
        position: 'relative',
        left: '81%',
        // width: '10%',
        // height: '10%',
        backgroundColor: 'white',
        // color: 'white',
        border: 'none',
        // paddingLeft: '10px',
        width: '15px',
        // height: '15px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '25px',
        fontWeight: 'bold',
        color:"red"


    },
    addmed: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: '20px',
    },
    lbl: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        display: 'flex',
        // color: 'black',
    },
    inp: {
        padding: '5px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor:"white",
        color: "black",
        fontSize: "15px",
        fontWeight: "bold",
    },
    lefbody: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 20px #ccc',
    },
    horizontalscroll: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',  // Enable horizontal scrolling
        width: '96%',      // Set the width to 100% to fill the available space
        padding: '10px',
        scrollbarWidth: 'none',
    },
    medcard: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'space-around',
        // width: '200px',    // Remove fixed width
        minWidth: '400px',   // Set minimum width to ensure cards don't shrink
        minHeight: '90%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '10px',
        marginRight: '25px',
        paddingRight: '10px',
        marginTop: '10px',
    },
    
    label: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: 'black',
        width: '90%',
    },
    value: {
        border: '1px solid #ccc',
        padding: '6px',
        borderRadius: '5px',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '18px',
        width: '90%',
    },
    field: {
        display: 'flex',
        flexDirection: 'row',

        alignItems: 'left',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '10px',
        paddingTop: '10px',
        
    },
    rightbody: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '90%',
        // backgroundColor: 'white',
        // padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 20px #ccc',
    },
    exercisecard: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'space-around',
        // width: '200px',    // Remove fixed width
        minWidth: '400px',   // Set minimum width to ensure cards don't shrink
        minHeight: '90%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '10px',
        marginRight: '25px',
        paddingRight: '10px',
        marginBottom: '35px',
    },
    lowerbody: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '99%',
        height: '85%',
        
        paddingTop: '3px',
        borderRadius: '10px',
        boxShadow: '0 0 20px #ccc',
    },
    headlabel: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: 'black',
        width: '90%',
    },
    headvalue: {
        border: '2px solid #ccc',
        padding: '6px',
        borderRadius: '5px',
        // backgroundColor: 'white',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        width: '90%',
        marginLeft: '10px',
    },
   


}
