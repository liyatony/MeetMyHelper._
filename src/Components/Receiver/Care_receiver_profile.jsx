import React from 'react';
import { useState } from 'react';
import { database } from '../../firebase_config';
import { collection, setDoc,doc } from 'firebase/firestore';
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { useNavigate } from 'react-router';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const CarereceiverProfile = ({eandp}) => {
  const navigate = useNavigate();
  
  const [eandp1] = useState(eandp);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // Limit to only one file
    setFileList(newFileList);
  };
  const handleOnClick = async() => {
    // get all values from the form
    const formvalues = document.querySelectorAll('input, textarea');
    const data = {};
    formvalues.forEach((input) => {
      // Use the 'name' attribute as the key for the data object
      if(input.name.length>0)
      data[input.name] = input.value.length>0?input.value:"abc";
      
      
    });
    formvalues.forEach((textarea) => {
      if(textarea.name.length>0)
      data[textarea.name] = textarea.value.length>0?textarea.value:"abc";
      
    });
    const storage = getStorage();
    data['imageUrl'] = '';  
    if(fileList.length > 0)
    {
      try
      {
        const storageRef = ref(storage, `images/${eandp1.state.data.email}`);
        await uploadBytes(storageRef, fileList[0].originFileObj);
        const imageUrl = await getDownloadURL(storageRef);
        
        data['imageUrl'] = imageUrl;
        console.log("imageUrl",imageUrl);

      }
      catch(e)
      {
        console.error("Error uploading image: ", e);
      }

    }
    data['email']=eandp1.state.data.email;
    data['password']=eandp1.state.data.password;
    
    
    try{
      console.log("data",data);
      const reff=collection(database, "carereceivers");
      const documentRef = doc(reff, eandp1.state.data.email);
      const docRef = setDoc(documentRef, data);
      console.log("Document written with ID: ", docRef);
      message.success("Profile created successfully");
      navigate("/login");

    }
    catch(e){
      console.error("Error adding document: ", e);
    }

  };
  return (
    <div style={styles.profileContainer}>
      <div style={styles.leftColumn}>
          <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture"
          defaultFileList={[...fileList]}
          className="upload-list-inline"
          onChange={handleFileChange}

        > 
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
      <div style={styles.midColumn}>
        <div style={styles.profileDetails}>
              <h2>Carereceiver Profile</h2>
              <div style={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" name="name"    style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label>Age</label>
                <input type="text" name="age"   style={styles.input} />
              </div>
                <div style={styles.formGroup}>
                <label>Telephone</label>
                <input type="text" name="telephone"   style={styles.input} />
              </div>
              
              <div style={styles.formGroup}>
                <label>Address</label>
                <textarea  style={styles.textarea} name="address">123 Main Street, City, Country</textarea>
              </div>
              
              <div style={styles.formGroup}>
                <label>Language preference</label>
                <input type="text"  name="language"  style={styles.input} />
                </div>

            {/* Specialization Needed */}
            <div style={styles.formGroup}>
              <label>Specialization Needed</label>
              <input type="text"  name="specialization"  style={styles.input} />
              </div>

          {/* Medications */}
            <div style={styles.formGroup}>
              <label>Medications</label>
              <input type="text"  name="medication" style={styles.input} />
              </div>

            {/* Allergies */}
            <div style={styles.formGroup}>
              <label>Allergies</label>
              <input type="text"   name="allergy" style={styles.input} />
              </div>

          {/* Dietary Needed */}
            <div style={styles.formGroup}>
              <label>Dietary Needed</label>
              <input type="text"   name="diet_needed" style={styles.input} />
              </div>

          {/* Preferred Contact Method*/}
            <div style={styles.formGroup}>
              <label>Preferred Contact Method</label>
              <input type="text"  name="pref_contact"  style={styles.input} />
              </div>
          </div>
        </div>
          <div style={styles.rightColumn}>
        <div style={styles.profileDetails}>
          {/* Emergency Contact Name*/}
          <div style={styles.formGroup}>
            <label>Emergency Contact Name</label>
            <input type="text"  name="emer_contact_name"  style={styles.input} />
            </div>

          {/* Emergency Contact Number*/}
          <div style={styles.formGroup}>
            <label>Emergency Contact Number</label>
            <input type="text"  name="emer_contact_num"  style={styles.input} />
            </div>

          {/* Emergency Contact Relationship*/}
          <div style={styles.formGroup}>
            <label>Emergency Contact Relationship</label>
            <input type="text"   name="emer_contact_relation" style={styles.input} />
            </div>

          {/* Medical History */}
          <div style={styles.formGroup}>
            <label>Medical History</label>
            <textarea name="med_his"  style={styles.textarea}>None</textarea>
            </div>

          {/* Mobility Aids Used */}
          <div style={styles.formGroup}>
            <label>Mobility Aids Used</label>
            <input type="text"  name="mobi_aid"  style={styles.input} />
            </div>

          {/* Additional Information */}
          {/* Assistance with Daily Living Activities */}
          <div style={styles.formGroup}>
            <label>Assistance with Daily Living Activities</label>
            <input type="text"  name="daily_act"  style={styles.input} />
            </div>

            {/* Health Insurance Provider */}
          <div style={styles.formGroup}>
            <label>Health Insurance Provider</label>
            <input type="text"  name="health_inssure"  style={styles.input} />
            </div>

            {/* Health Insurance Policy Number */}
          <div style={styles.formGroup}>
            <label>Health Insurance Policy Number</label>
            <input type="text"  name="policy_num"  style={styles.input} />
            </div>

            {/* Primary Care Physician */}
          <div style={styles.formGroup}>
            <label>Primary Care Physician</label>
            <input type="text"  name="physician"  style={styles.input} />
            </div>

            {/* Preferred Care Schedule */}
          <div style={styles.formGroup}>
            <label>Preferred Care Schedule</label>
            <input type="text"  name="pref_care"  style={styles.input} />
            </div>

            {/* Special Preferences or Requirements */}
          <div style={styles.formGroup}>
            <label>Special Preferences or Requirements</label>
            <input type="text"  name="spcl_req"  style={styles.input} />
            </div>
            <button style={styles.btn}onClick={handleOnClick}>Submit</button>

        </div>
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    width: '80%',
    marginTop: '105px',
    marginBottom: '50px',
    height: '75vh',
    margin: '20px auto',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
    display: 'flex',
    gap: '20px',
    overflowY: 'scroll', // Prevent overflow
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
    flexWrap: 'wrap', // Wrap items when they reach container width
  },
  leftColumn: {
    
  },
  midColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  profilePicContainer: {
    width: '150px',
    height: '150px',
    border: '2px dashed #aaa',
    borderRadius: '50%',
    margin: '0 auto', // Center the profile picture horizontally
    display: 'flex',
  },
  profilePic: {
    maxWidth: '100%',
    borderRadius: '50%',
  },
  profileDetails: {
    textAlign: 'left',
    padding: '0 20px', // Add some padding to the right column
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: 'calc(100% - 320px)',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    marginLeft: '10px',
    color:"black",
  },
  textarea: {
    width: 'calc(100% - 320px)',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    height: '100px',
    marginLeft: '10px',
    color:"black"
  },
  btn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    // transition: 'background-color 0.3s',
    
  },  

};


export default CarereceiverProfile;
