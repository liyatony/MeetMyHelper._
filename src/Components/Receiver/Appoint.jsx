import background from '../../assets/apoint.jpg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, query, where,onSnapshot } from 'firebase/firestore';
import { database } from '../../firebase_config';
import { message } from 'antd';
import Loading from '../Loader';

const Appoint = () => {
    const { state } = useLocation();
    const [apoints, setapoints] = useState([]);
    console.log("ssss",state);

    const fetchapoints = async () => {
        try {
            const unsubscribe = onSnapshot(
                query(collection(database, 'appointments'), where("care_reciever_email", "==", state.myem)),
                (querySnapshot) => {
                    const arr = [];
                    querySnapshot.forEach((doc) => {
                        arr.push(doc.data());
                    });
                    setapoints(arr);
                }
            );
            
            // Optionally, return the unsubscribe function if you want to stop listening to updates
            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchapoints();
    }, []); // Empty dependency array

    const [formData, setFormData] = useState({
        dailyDuration: '',
        no_of_days: '',
        hourlyPrice: '',
        advancePayment: '',
        typeOfWork: '',
        location: '',
        care_reciever_email: state.myem,
        care_reciever_name: state.myname,
        care_reciever_image: state.myimage,
        care_taker_email: state.giverdetEmail,
        request_accepted: false,
        request_rejected: false,
        care_taker_name: state.giverdetname,
        care_taker_image: state.giverdetimage,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(database, 'appointments'), formData);
            console.log("Document written with ID: ", docRef.id);
            message.success("Requested for service");
            // clear form
            setFormData({
                dailyDuration: '',
                no_of_days: '',
                hourlyPrice: '',
                advancePayment: '',
                typeOfWork: '',
                location: '',
                care_reciever_email: state.myem,
                care_reciever_name: state.myname,
                care_reciever_image: state.myimage,
                care_taker_email: state.giverdetEmail,
                request_accepted: false,
                request_rejected: false,
                care_taker_name: state.giverdetname,
                care_taker_image: state.giverdetimage,
            });

            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div style={styles.outer}>
            <div style={styles.inner1}>
                <div style={styles.appointhead}>
                    <h2>Appoint</h2>
                </div>
                <div style={styles.appointbox}>
                    <form style={styles.form} onSubmit={handleSubmit}>
                        <label style={styles.label}>
                            Daily Duration:
                            <input style={styles.input} type="text" name="dailyDuration" value={formData.dailyDuration} onChange={handleChange} />
                        </label>
                        <label style={styles.label}>
                            No of Days:
                            <input style={styles.input} type="text" name="no_of_days" value={formData.no_of_days} onChange={handleChange} />
                        </label>
                        <label style={styles.label}>
                            Hourly Salary:
                            <input style={styles.input} type="text" name="hourlyPrice" value={formData.hourlyPrice} onChange={handleChange} />
                        </label>
                        <label style={styles.label}>
                            Advance Payment:
                            <input style={styles.input} type="text" name="advancePayment" value={formData.advancePayment} onChange={handleChange} />
                        </label>
                        <label style={styles.label}>
                            Type of Work:
                            <input style={styles.input} type="text" name="typeOfWork" value={formData.typeOfWork} onChange={handleChange} />
                        </label>
                        <label style={styles.label}>
                            Location:
                            <input style={styles.input} type="text" name="location" value={formData.location} onChange={handleChange} />
                        </label>
                        <button style={styles.bidbtn} type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div style={styles.inner2}>
                    {/* <h2>Appointments</h2> */}
                <div className="statusbox" style={styles.statusbox}>
                    <div style={styles.scrollcont}>
                        {apoints.map((apoint, index) => (
                            <div key={index} style={styles.appointmentCard}>
                                <div style={styles.cardname}>
                                    <img  style={styles.cardimg} src={apoint.care_taker_image ?apoint.care_taker_image :"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="care_taker" width="100" height="100" />
                                    <h3 style={styles.cardtaker}>{apoint.care_taker_name}</h3>
                                </div>
                                <div style={styles.cardbody}>
                                {apoint.request_accepted || apoint.request_rejected ? (
                                    <div>
                                        <p>
                                            <b>Request Accepted:</b>{" "}
                                            <span style={{ color: apoint.request_accepted ? "green" : "red" }}>
                                                {apoint.request_accepted ? "Yes" : "No"}
                                            </span>
                                        </p>
                                        <p>
                                            <b>Request Rejected:</b>{" "}
                                            <span style={{ color: apoint.request_rejected ? "green" : "red" }}>
                                                {apoint.request_rejected ? "Yes" : "No"}
                                            </span>
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                    <p style={{ color: "#f27405", fontSize:"30px"}}>Pending ....</p>
                                    <Loading/>
                                    </>
                                )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appoint;

const styles = {
    outer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        margin: "auto",
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",

    },
    inner1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        width: '78%',
        borderRadius: '10px',
        // padding: '20px',
        marginBottom: '20px',
        marginTop: '20px',
        boxShadow: '0 0 20px #ccc',
        backdropFilter: 'blur(4px)',
    },
    inner2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '78%',
        borderRadius: '10px',
        // padding: '20px',
        
        marginBottom: '20px',
        marginTop: '5px',
        boxShadow: '0 0 20px #ccc',
        // backdropFilter: 'blur(1px)',
    },
    appointhead: {
        // marginBottom: '10px',
        marginTop: '20px',
    },
    appointbox: {
        
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: '20px',
        borderRadius: '10px',
        height: '70%',
        width: '70%',
        marginBottom:  '50px'

    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: 'auto',
        width: '70%',
        height: '100%',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
    },
    input: {
        padding: '5px',
        margin: '5px',
        width: '100%',
        borderRadius: '10px',
        background: 'transparent',
        color: 'black',
        fontSize: '15px',
        fontWeight: 'bold',
    },
    
    statusbox: {
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        // padding: '5px',
        borderRadius: '10px',
        height: '100%',
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        scrollbarwidth: 'none',
        overflowX: 'scroll',
        scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none', /* Internet Explorer 10+ */
    '&::-webkit-scrollbar': {
        display: 'none', /* WebKit */
    },

        
    },
    scrollcont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // width: '100%',
        // backgroundColor: 'red' ,
        height: '80%', 
        marginTop: '30px',
        
    },
    appointmentCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        
        // padding: '10px',
        borderRadius: '10px',
        border: '6px solid #ccc',
        margin: '10px',
        // width: '100%',

        minWidth: '400px',
        height: '100%',
    },
    cardname: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'sp',
        padding: '10px',
        // backgroundColor: 'red',
        borderBottom: '5px solid #ccc',
    },
    cardimg: {
        borderRadius: '50%',
        height: '60px',
        width: '60px',
        marginRight: '10px',
    },
    cardtaker: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginLeft: '25%',
        // backgroundColor: 'red',
        
    },
    cardbody: {
        padding: '10px',
        
    },
    bidbtn: {
        padding: '10px',
        margin: '10px',
        backgroundColor: '#443157',
        color: 'white',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
        position: 'relative',
        left: '105%',
        top: '-24%'
    },
}
