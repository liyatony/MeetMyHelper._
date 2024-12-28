import React, { useState, useEffect } from 'react';
import { database } from '../../firebase_config';
import { collection, addDoc, onSnapshot, where, deleteDoc, doc, query, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import trash from '../../assets/icons/trash.png';
import add from '../../assets/icons/add.png';

const ToggleDashboard = ({ myemail, myname }) => {
    const [isMedModalOpen, setIsMedModalOpen] = useState(false);
    const [isExeModalOpen, setIsExeModalOpen] = useState(false);
    const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
    const [meds, setMeds] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [healthData, setHealthData] = useState([]);
    const [carereceivers, setCarereReceivers] = useState({});

    const fetchcarereceivers = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(database, 'carereceivers')));
            const arr = {};
            querySnapshot.forEach((doc) => {
                arr[doc.id] = doc.data();
            });
            setCarereReceivers(arr);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchcarereceivers();
    }, []);

    const fetchMedicine = async () => {
        try {
            const q = query(
                collection(database, 'medicines'),
                where("giveremail", "==", myemail)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    arr.push({ id: doc.id, ...doc.data() });
                });
                setMeds(arr);
            });
            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }

    const fetchExercises = async () => {
        try {
            const q = query(
                collection(database, 'exercises'),
                where("giveremail", "==", myemail)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    arr.push({ id: doc.id, ...doc.data() });
                });
                setExercises(arr);
            });
            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }

    const fetchHealthData = async () => {
        try {
            const q = query(
                collection(database, 'healthdata'),
                where("giveremail", "==", myemail)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    arr.push({ id: doc.id, ...doc.data() });
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

    const toggleHealthModal = () => {
        setIsHealthModalOpen(!isHealthModalOpen);
    }

    const toggleMedModal = () => {
        setIsMedModalOpen(!isMedModalOpen);
    }

    const toggleExeModal = () => {
        setIsExeModalOpen(!isExeModalOpen);
    }

    const submitMedicine = () => {
        const medname = document.querySelector('input[name="medicine"]').value;
        const dosage = document.querySelector('input[name="dosage"]').value;
        const time = document.querySelector('input[name="time"]').value;
       // const date = document.querySelector('input[name="date"]').value;
        const recievermail = document.querySelector('input[name="email"]').value;

        if (carereceivers[recievermail]) {
            const addmed = async () => {
                try {
                    const docRef = await addDoc(collection(database, 'medicines'), {
                        medname: medname,
                        dosage: dosage,
                        time: time,
                       // date: date,
                        giveremail: myemail,
                        recievername: carereceivers[recievermail].name,
                        recievermail: recievermail,
                        givername: myname
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            addmed();
            toggleMedModal();
        } else {
            alert("Invalid receiver email");
        }
    }

    const submitExercise = () => {
        const exerciseName = document.querySelector('input[name="exerciseName"]').value;
        const duration = document.querySelector('input[name="duration"]').value;
        const date = document.querySelector('input[name="date"]').value;
        const recievermail = document.querySelector('input[name="email"]').value;

        if (carereceivers[recievermail]) {
            const addExercise = async () => {
                try {
                    const docRef = await addDoc(collection(database, 'exercises'), {
                        exerciseName: exerciseName,
                        duration: duration,
                        date: date,
                        giveremail: myemail,
                        givername: myname,
                        recievername: carereceivers[recievermail].name,
                        recievermail: recievermail,
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            addExercise();
            toggleExeModal();
        } else {
            alert("Invalid receiver email");
        }
    }

    const submitHealthData = () => {
        const bloodPressure = document.querySelector('input[name="bloodPressure"]').value;
        const sugarLevel = document.querySelector('input[name="sugarLevel"]').value;
        const weight = document.querySelector('input[name="weight"]').value;
        const recievermail = document.querySelector('input[name="email"]').value;
        const date = document.querySelector('input[name="date"]').value;
        const time = document.querySelector('input[name="time"]').value;
        if (carereceivers[recievermail]) {
            const addHealthData = async () => {
                try {
                    const docRef = await addDoc(collection(database, 'healthdata'), {
                        bloodPressure: bloodPressure,
                        sugarLevel: sugarLevel,
                        weight: weight,
                        date: date,
                        time: time,
                        giveremail: myemail,
                        givername: myname,
                        recievermail: recievermail,
                        recievername: carereceivers[recievermail].name
                        
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            addHealthData();
            toggleHealthModal();
        } else {
            alert("Invalid receiver email");
        }
    }

    const deletedata = async (col, id) => {
        try {
            console.log("id", id);
            await deleteDoc(doc(database, col, id));
            console.log("Document deleted from ", col, " with ID: ", id);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div style={styles.outer}>
            <div style={styles.upper}>
                <div style={styles.left}>
                    <div style={styles.head}>
                        <div style={styles.plusbtn} onClick={toggleMedModal}></div>
                        <div style={styles.name}>Medicines Taken</div>
                    </div>

                    <div style={styles.leftbody}>
                        <div style={styles.horizontalscroll}>
                            {meds.map((med, index) => (
                                <div style={styles.medcard} key={index}>
                                    <div style={styles.deleteButton} onClick={() => deletedata("medicines",med.id)}></div>
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">Medicine Name</label>
                                        <div style={styles.value}>{med.medname}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">Dosage</label>
                                        <div style={styles.value}>{med.dosage}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">DateAndTime</label>
                                        <div style={styles.value}>{med.time}</div>
                                    </div>
                                   
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">Receiver Name</label>
                                        <div style={styles.value}>{med.recievername}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={styles.right}>
                    <div style={styles.head}>
                        
                        <div style={styles.plusbtn} onClick={toggleExeModal}></div>
                        <div style={styles.name}>Exercises To Do</div>
                    </div>

                    <div style={styles.rightbody}>
                        <div style={styles.horizontalscroll}>
                            {exercises.map((exercise, index) => (
                                <div style={styles.exercisecard} key={index}>
                                    <div style={styles.deleteButton} onClick={() => deletedata("exercises",exercise.id)}></div>
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">Exercise Name</label>
                                        <div style={styles.value}>{exercise.exerciseName}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">Duration</label>
                                        <div style={styles.value}>{exercise.duration}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text"><Date></Date></label>
                                        <div style={styles.value}>{exercise.date}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">Reciever Name</label>
                                        <div style={styles.value}>{exercise.recievername}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={styles.lower}>
            <div style={styles.head}>
                    <div style={styles.plusbtn} onClick={toggleHealthModal}></div>
                    <div style={styles.name}>Health Datas</div>
                </div>
                <div style={styles.lowerbody}>
                    <div style={styles.horizontalscroll}>
                        {healthData.map((data, index) => (
                            <div style={styles.medcard} key={index}>
                                <div style={styles.deleteButton} onClick={() => deletedata("healthdata",data.id)}></div>
                                <div style={styles.field}>
                                    <label style={styles.label} htmlFor="text">Blood Pressure</label>
                                    <div style={styles.value}>{data.bloodPressure}</div>
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label} htmlFor="text">Sugar Level</label>
                                    <div style={styles.value}>{data.sugarLevel}</div>
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label} htmlFor="text">Weight</label>
                                    <div style={styles.value}>{data.weight}</div>
                                </div>
                                <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">Date</label>
                                        <div style={styles.value}>{data.date}</div>
                                    </div>
                                    <div style={styles.field}>
                                        <label style={styles.label} htmlFor="text">Time</label>
                                        <div style={styles.value}>{data.time}</div>
                                    </div>
                                <div style={styles.field}>
                                    <label style={styles.label} htmlFor="text">Receiver Name</label>
                                    <div style={styles.value}>{data.recievername}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            {/* Render medicine modal */}
            {isMedModalOpen && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modalContent}>
                        <button style={styles.closebtn} onClick={toggleMedModal}>X</button>
                        <h1 style={styles.addmed}>ADD MEDICINE</h1>
                        <label style={styles.lbl} htmlFor="text">Medicine Name</label>
                        <input style={styles.inp} type="text" id="text" name="medicine" placeholder="Medicine Name" />
                        <label style={styles.lbl} htmlFor="text">Dosage</label>
                        <input style={styles.inp} type="text" id="text" name="dosage" placeholder="Dosage" />
                        <label style={styles.lbl} htmlFor="text">Time</label>
                        <input style={styles.inp} type="text" id="text" name="time" placeholder="Time" />
                        <label style={styles.lbl} htmlFor="text">Receiver Email</label>
                        <input style={styles.inp} type="text" id="text" name="email" placeholder="email@gmail.com" />
                        <button onClick={submitMedicine}>Submit</button>
                        <br />
                    </div>
                </div>
            )}

            {/* Render exercise modal */}
            {isExeModalOpen && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modalContent}>
                        <button style={styles.closebtn} onClick={toggleExeModal}>X</button>
                        <h1 style={styles.addmed}>ADD EXERCISE</h1>
                        <label style={styles.lbl} htmlFor="text">Exercise Name</label>
                        <input style={styles.inp} type="text" id="text" name="exerciseName" placeholder="Exercise Name" />
                        <label style={styles.lbl} htmlFor="text">Duration</label>
                        <input style={styles.inp} type="text" id="text" name="duration" placeholder="Duration" />
                        <label style={styles.lbl} htmlFor="text">Intensity</label>
                        <input style={styles.inp} type="text" id="text" name="intensity" placeholder="Intensity" />
                        <label style={styles.lbl} htmlFor="text">Reciver Email</label>
                        <input style={styles.inp} type="text" id="text" name="email" placeholder="Email" />
                        <button onClick={submitExercise}>Submit</button>
                        <br />
                    </div>
                </div>
            )}
            {isHealthModalOpen && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modalContent}>
                        <button style={styles.closebtn} onClick={toggleHealthModal}>X</button>
                        <h1 style={styles.addmed}>ADD HEALTH DATA</h1>
                        <label style={styles.lbl} htmlFor="text">Blood Pressure</label>
                        <input style={styles.inp} type="text" id="text" name="bloodPressure" placeholder="Blood Pressure" />
                        <label style={styles.lbl} htmlFor="text">Sugar Level</label>
                        <input style={styles.inp} type="text" id="text" name="sugarLevel" placeholder="Sugar Level" />
                        <label style={styles.lbl} htmlFor="text">Weight</label>
                        <input style={styles.inp} type="text" id="text" name="weight" placeholder="Weight" />
                        <label style={styles.lbl} htmlFor="text">Reciever Email</label>
                        <input style={styles.inp} type="text" id="text" name="email" placeholder="Email" />
                        <button onClick={submitHealthData}>Submit</button>
                        <br />
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default ToggleDashboard;




const styles ={
    outer:{
        display:'flex',
        flexDirection:'column',
        height:'100%',
        width:'97%',
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
        // display:'flex',
        // width:'40px',
        // height:'30px',
        // backgroundColor:'purple',
        backgroundImage:'url('+add+')',
        backgroundSize:'cover',
        width:'40px',
        height:'40px',


        position:'relative',
        left:'91.5%',

        
        // alignItems:'center',
        // justifyContent:'center',
        // fontSize:'90px',
        // paddingBottom:'20px',
        // borderRadius:'50%',
        // color:'white',
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
        minWidth: '300px', 
        maxWidth:'500px',  // Set minimum width to ensure cards don't shrink
        height: '90%',
        // minHeight: '100px',
        maxHeight: '300px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '10px',
        marginRight: '25px',
        paddingRight: '10px',
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
        maxHeight: '60px',
        
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
        minWidth: '300px',   // Set minimum width to ensure cards don't shrink
        height: '90%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '10px',
        marginRight: '25px',
        paddingRight: '10px',
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
    deleteButton: {
        background: `url(${trash})`,
        backgroundSize: 'cover',
        width: '30px',
        height: '30px',
        cursor: 'pointer',
    },


}
