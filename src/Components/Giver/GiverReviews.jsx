import React, { useState,useEffect } from 'react';
import Review_card from '../Receiver/Review_card';
import { Button, Modal, Form, Input, Rate } from 'antd';
import {database} from '../../firebase_config';
import { collection, addDoc,getDocs,where,onSnapshot,query } from 'firebase/firestore';
import Loader from '../Loader';
import fam from '../../assets/fam.jpg';


const { TextArea } = Input;

const GiverReviews = ({ giverem }) => {
    
    const [reviews,setreviews] = useState([]);
        console.log("giverem",giverem);
    

    
    const fetchreviews = async() => {
        try
        {
            const q = query(collection(database, 'reviews'), where('giver_email', '==', giverem));

            const unsubscribe = await onSnapshot(q, (snapshot) => {
                const arr = [];
                snapshot.forEach((doc) => {
                    arr.push(doc.data());
                });
                console.log("------",arr);
                setreviews(arr);
            });
        
            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
        
    }
    useEffect(() => {
        fetchreviews();
        
    }
    , []); // Empty dependency array
    

    // Dummy review data
    // const reviews = [
    //     { id: 1, text: "Review 1" },
    //     { id: 2, text: "Review 2" },
    //     { id: 3, text: "Review 3" }
    // ];
    console.log("review", reviews);
    return (
        <div style={styles.outercont}>
        <div style={styles.innercont}>
            {reviews.length === 0 ? (
                <div style={styles.loader}>
                <h1 style={{color:"blue"}}>No reviews</h1>
                <Loader/>
                </div>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} style={styles.card}>
                        <Review_card review={review} />
                    </div>
                ))
            )}
        </div>
    </div>
    );
}

export default GiverReviews;

const styles = {
    outercont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '76vh',
        width: '93%',
        // backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        margin: '20px',
        boxShadow: '0 0 20px #ccc',
    },
    innercont: {
        width: '98%',
        height: '100%',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        // backgroundColor:"red",
        // backgroundImage: `url(${fam})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        


        
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: 'auto',
        backgroundColor: 'transparent',
        // backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '20px',
        height: 'auto',
        boxShadow: '0 0 20px #ccc',
        marginBottom: '30px',
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
    },
    btn: {
        // backgroundColor: 'green',
        color: 'white',
        borderRadius: '50%',
        marginLeft: '20px',
        position: 'fixed',
        top: '120px',
        right: '50px',
        width: '3%',
        height: '6%',
        fontSize: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '26px',
        overflow: 'hidden',
    },
    modal: {
        // 
    },
    textarea: {
        fontSize: '20px', // Increase font size
    },
    submitBtn: {
        background: 'blue', // Change background color
        color: 'white', // Change text color
        border: 'none', // Remove border
        fontSize: '20px', // Increase font size
        paddingBottom: '40px',
        borderRadius: '10px', // Remove border radius
    },
    rate:
    {
        fontSize: '30px', // Increase font size
    },
    label: {
        fontSize: '24px', // Increase label font size
        fontWeight: 'bold', //
    },
    modtitle: {
        fontSize: '30px', // Increase font size
        fontWeight: 'bold', // Make title bold
        color: 'blue', // Change title color
    },
    loader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        // backgroundColor: 'transparent',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        marginTop: '20px',
        boxShadow: '0 0 20px #ccc',
    },
     
}
