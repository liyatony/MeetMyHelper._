import React, { useState,useEffect } from 'react';
import Review_card from './Review_card';
import { Button, Modal, Form, Input, Rate } from 'antd';
import {database} from '../../firebase_config';
import { collection, addDoc,getDocs,where,onSnapshot,query } from 'firebase/firestore';

const { TextArea } = Input;

const Show_reviews = ({ myem,giverem }) => {
    const [visible, setVisible] = useState(false);
    const [reviews,setreviews] = useState([]);
    const [reviwers,setreviwers] = useState([]);
    console.log("Myem", myem);

    const fetchreviewers=async()=>
    {
        try
        {
            const querySnapshot = await getDocs(
                query(collection(database, 'carereceivers'), where("email", "==", myem))
                // Use 'query' to create a query with a filter using 'where'
            );
            const arr = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            
            setreviwers(arr[0]);
        }
        catch(e)
        {
            console.log(e);
        }
    }

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
        }
        catch(e)    
        {
            console.log(e);
            
        }
        
    }
    useEffect(() => {
        fetchreviews();
        fetchreviewers();
    }
    , []); // Empty dependency array
    console.log("Reveiwers",reviwers);
    // console.log("reviewers",reviwers);
    const addrev = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        const data = {
            rating: values.rating,
            text: values.text,
            reviewer_email: myem,
            giver_email: giverem,
            reviewer_name: reviwers.name,
            reviewer_photo: reviwers.imageUrl,
            
        }
        console.log("data",data);
        try
        {
            addDoc(collection(database, 'reviews'), data);
            console.log("done",data);

        }
        catch(e)
        {
            console.log(e);
        }   

        setVisible(false);
    };

    // Dummy review data
    // const reviews = [
    //     { id: 1, text: "Review 1" },
    //     { id: 2, text: "Review 2" },
    //     { id: 3, text: "Review 3" }
    // ];
    console.log("review", reviews);
    return (
        <div style={styles.outercont}>
            <div style={styles.head}>
                <h1>Reviews</h1>
                <Button onClick={addrev} style={styles.btn}>+</Button>
            </div>

            <div style={styles.innercont}>
            {reviews.map((review, index) => (
                    <div key={index} style={styles.card}>
                        <Review_card review={review} />
                    </div>
                ))}
            </div>

            <Modal
                title={<span style={styles.modtitle}>Add Review</span>}
                open={visible}
                onCancel={handleCancel}
                footer={null}
                 // Apply custom styles to the modal
            >
                <Form
                    name="add_review_form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="rating"
                        label={<span style={styles.label}>Rating</span>}
                        rules={[{ required: true, message: 'Please rate your experience!' }]}
                        
                    >
                        <Rate style={styles.rate}/>
                    </Form.Item>

                    <Form.Item
                        name="text"
                        label={<span style={styles.label}>Review</span>}
                        rules={[{ required: true, message: 'Please enter your review!' }]}
                    >
                        <TextArea rows={4} style={styles.textarea} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={styles.submitBtn}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Show_reviews;

const styles = {
    outercont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        width: '100%',
        // backgroundColor: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        marginTop: '20px',
        boxShadow: '0 0 20px #ccc',
    },
    innercont: {
        width: '98%',
        height: '100%',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: 'auto',
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
        backgroundColor: 'green',
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
     
}
