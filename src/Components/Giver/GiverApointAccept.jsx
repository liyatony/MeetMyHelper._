import { Button } from 'antd';
import accept from '../../assets/accept.png';
import reject from '../../assets/reject.png';
import { useState } from 'react';
import { database } from '../../firebase_config';
import { collection, updateDoc,query,where,getDocs,doc } from 'firebase/firestore';

const GiverApointAccept = ({ review }) => {
  // console.log("QWERTY", review);

  const [interest, setInterest] = useState(null);

  const handleInterest = async (value) => {
    
    setInterest(value);
    

    try {
      
      const docRef = doc(database, "appointments", review.id);
          try {
              
              if (value) {
                await updateDoc(docRef, { 'request_rejected': false });
                  await updateDoc(docRef, { 'request_accepted': true });
                } else {
                await updateDoc(docRef, { 'request_accepted': false });
                  await updateDoc(docRef, { 'request_rejected': true });
              }
              console.log("Document updated successfully");
          } catch (updateError) {
              console.log("Error updating document:", updateError);
          }
     
  } catch (queryError) {
      console.log("Error querying caretakers collection:", queryError);
  }
  
  
};

    
  

  return (
    <div style={styles.outer}>
      <div style={styles.head}>
        <img
          src={review.data.care_reciever_image ? review.data.care_reciever_image : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"}
          alt=""
          style={styles.img}
        />
        <div style={styles.headandname}>
          <h1 style={styles.h2}>{review.data.care_reciever_name}</h1>
        </div>
        <div style={styles.accp}>
        <h1 style={styles.h3}>Status :</h1>
    <h1 style={{ color: review.data.request_accepted ? 'green' : review.data.request_rejected ? 'red' : '#f7662d' }}>
        {review.data.request_accepted ? "Accepted" : review.data.request_rejected ? "Rejected" : "Pending"}
    </h1>
</div>

      </div>
      <div style={styles.bodyContainer}>
        <div style={styles.bodyleft}>
          <div style={styles.field}>
            <label style={styles.label}>Daily Duration</label>
            <span style={styles.value}>{review.data.dailyDuration}</span>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Hourly Salary</label>
            <span style={styles.value}>{review.data.hourlyPrice}</span>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Location</label>
            <span style={styles.value}>{review.data.location}</span>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>No Of Days </label>
            <span style={styles.value}>{review.data.no_of_days}</span>
          </div>
        </div>
        <div style={styles.bodyright}>
          <div style={styles.fieldbtn} onClick={() => handleInterest(true)}>
            <div><img src={accept} alt="Accept" style={styles.accbtn} /> </div>
            <div>Accept</div>
          </div>
          <div style={styles.fieldbtn2} onClick={() => handleInterest(false)}>
            <div><img src={reject} alt="Reject" style={styles.accbtn} /> </div>
            <div>Reject</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiverApointAccept;


  
  const styles = {
    outer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh',
      width: '90%',
      // backgroundColor: '#ffffff',
      borderRadius: '30px',
      boxShadow: '0 0 20px #ccc',
      // backgroundColor: 'rgba(53, 83, 110, 0.9)', 
      backgroundColor: 'rgba(255, 255, 255, 0.7)', 
      // filter: 'blur(8px)', // Corrected value for blur filter
      // WebkitFilter: 'blur(8px)' // Vendor prefix for WebKit browsers
    },    
    head: {
      marginBottom: '20px',
      borderRadius: '30px',
      height: '40%',
      position: 'relative',
      top: '-10%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: '170px',
      height: '170px',
      borderRadius: '50%',
      marginRight: '20px',
    },
    headandname: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h2: {
      color: '#64eddf',
      fontSize: '40px',
      fontWeight: 'bold',
    },
    bodyContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: '40%',
    },
    bodyleft: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%',
      height: '100%',
    },
    bodyright: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%',
      height: '100%',
      // backgroundColor:"red"

    },
    field: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '80%',
      marginBottom: '10px',
    },
    label: {
      fontSize: '24px',
      fontWeight: 'bold',
      width:"100%",
      display:"flex"
    },
    value: {
      border: '1px solid #ccc',
      padding: '6px',
      borderRadius: '5px',
      width: '70%',
      backgroundColor: '#f5f5f5',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '10px',


    },
    accbtn:
    {
      width:"50px",
      height:"80px",
      // marginRight: "0px",
      cursor: "pointer",
      
    },
    fieldbtn:
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      marginBottom: '10px',
      // backgroundColor:"yellow",
      position: "relative",
      left: "-10%",
      mouse: "pointer",
      fontSize: '24px',
      fontWeight: 'bold',
    },
    fieldbtn2:
    {
      mouse: "pointer",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      marginBottom: '10px',
      // backgroundColor:"yellow",
      position: "relative",
      left: "10%",
      
      fontSize: '24px',
      fontWeight: 'bold',
    },
    accp:
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      marginBottom: '10px',
      // backgroundColor:"yellow",
      position: "relative",
      left: "20%",
      color: 'red',
    },
    h3:
    {
      fontSize: '24px',
      fontWeight: 'bold',
      width: "100%",
      display: "flex",
      position: "relative",
      top: "50px",
    }
  };