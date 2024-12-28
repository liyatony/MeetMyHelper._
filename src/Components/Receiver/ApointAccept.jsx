import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { database } from '../../firebase_config';
import ApointAcard from './ApointAccard';
import back from '../../assets/back.png'

const ApointAccept = ({ myem }) => {
    const [accept, setAccept] = useState([]);
    const [reject, setReject] = useState([]);
    const [pending, setPending] = useState([]);
    const [apoints, setApoints] = useState([]);

    useEffect(() => {
        const fetchApoint = async () => {
            try {
                const q = query(collection(database, 'appointments'), where("care_reciever_email", "==", myem));
                const unsub = onSnapshot(q, (querySnapshot) => {
                    const arr = [];
                    querySnapshot.forEach((doc) => {
                        arr.push(doc.data());
                    });
                    setApoints(arr);
                });
                return unsub; // Unsubscribe when component unmounts
            } catch (e) {
                console.log(e);
            }
        };

        fetchApoint();
    }, [myem]); // Re-fetch appointments when myem changes

    useEffect(() => {
        const filterAppointments = () => {
            const pendingArr = apoints.filter(item => !item.request_accepted && !item.request_rejected);
            const acceptedArr = apoints.filter(item => item.request_accepted);
            const rejectedArr = apoints.filter(item => item.request_rejected);

            setAccept(acceptedArr);
            setReject(rejectedArr);
            setPending(pendingArr);
        };

        filterAppointments();
    }, [apoints]); // Re-filter appointments when apoints changes

    return (
        <div style={styles.outer}>
            <div style={styles.accept}>
                
                    <ApointAcard apoints={accept} />
                
            </div>
            <div style={styles.reject}>
                    
                        <ApointAcard apoints={reject} />
            </div>
            <div style={styles.pending}>
                    
                        <ApointAcard apoints={pending} />
            </div>
        </div>
    );
};

export default ApointAccept;

const styles = {
    outer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '90%',
        backgroundImage: `url(${back})`,
        // marginTop: '69px',
        padding: '3px',
    },
    accept: {
        height: '90%',
        width: '100%',
        
        marginTop: '20px',
        padding: '3px',
    },
    reject: {
        height: '90%',
        width: '100%',
        
        marginTop: '20px',
        padding: '3px',
    },
    pending: {
        height: '90%',
        width: '100%',
        
        marginTop: '20px',
        padding: '3px',
    }
};
