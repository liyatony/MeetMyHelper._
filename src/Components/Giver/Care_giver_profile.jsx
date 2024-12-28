import React, { useState } from 'react';
import { database } from '../../firebase_config';
import { collection, setDoc,doc } from 'firebase/firestore';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload,message } from 'antd';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router';

const CaregiverProfile = ({eandp}) => {
  
  const [eandp1] = useState(eandp);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  console.log('endp',eandp1);
  const handleFileChange = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // Limit to only one file
    setFileList(newFileList);
  };
  const addcaretaker = async (event) => {
    event.preventDefault(); 
    const formvalues = document.querySelectorAll('input, textarea');
    const data = {};
    data['imageUrl'] = '';
    const storage = getStorage();
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
    formvalues.forEach((input) => {
      if(input.name.length > 0)
      data[input.name] = input.value;
  });
  formvalues.forEach((textarea) => {
    // Use the 'name' attribute as the key for the data object
    if(textarea.name.length > 0)
      data[textarea.name] = textarea.value;
    });
    data['email']=eandp1.state.data.email;
    data['password']=eandp1.state.data.password;
    
    console.log("data",data);
    try
    {
      const reff=collection(database, "caretakers");
    const documentRef = doc(reff, eandp1.state.data.email);
    const docRef =await setDoc(documentRef, data);
    console.log("Document written with ID: ", docRef);
    if(documentRef)
    {
      message.success("Profile created successfully");
      navigate("/login");
      

    }
  }
    catch(e)
    {
      console.error("Error adding document: ", e);
    }


    
    
  };


  return (
    <>
      <section className="signup-container" style={styles.container}>
       
          
        <div style={styles.outercont}>
          <div className="left-column" style={styles.rl}>
            
            <form className="signup-form" style={styles.form}>
              <input
                type="text"
                name="fullName" // Assign a unique 'name' attribute
                placeholder="Full Name"
                style={styles.input}
              />
              {/* Assign 'name' attributes to other input fields */}
              <input
                type="number"
                name="age"
                placeholder="Age"
                style={styles.input}
              />
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                style={styles.input}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                style={styles.input}
              />
              {/* <input
                type="email"
                name="email"
                placeholder="Email"
                style={styles.input}
              /> */}
                <input
                  type="number"
                  name="yearsOfExperience"
                  placeholder="Years of Experience"
                  style={styles.input}
                />
              <input
                type="text"
                name="languagesSpoken"
                placeholder="Languages Spoken"
                style={styles.input}
              />
            </form>
          </div>
          <div className="middlecol" style={styles.middleColumn}>
            <form className="signup-form" style={styles.form}>
              <input
                type="text"
                name="availability"
                placeholder="Availability"
                style={styles.input}
              />
              <textarea
                name="clientFocus"
                placeholder="Client Focus"
                style={styles.textarea}
              ></textarea>
              <textarea
                name="servicesOffered"
                placeholder="Services Offered"
                style={styles.textarea}
              ></textarea>
              <textarea
                name="education"
                placeholder="Education"
                style={styles.textarea}
              ></textarea>
              
              <textarea
                name="qualification"
                placeholder="Qualification"
                style={styles.textarea}
              ></textarea>
              <textarea
                name="accommodation"
                placeholder="Accommodation"
                style={styles.textarea}
              ></textarea>
            </form>

          
        </div>
          <div className="right-column">
            <form className="signup-form" style={styles.form}>
             
              
              <textarea
                name="allergies"
                placeholder="Allergies (if any)"
                style={styles.textarea}
              ></textarea>
              <textarea
                name="personalInterestsAndHobbies"
                placeholder="Personal Interests and Hobbies"
                style={styles.textarea}
              ></textarea>
              <div style={styles.upbtn}>

              <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture"
              defaultFileList={[...fileList]}
              className="upload-list-inline"
              onChange={handleFileChange}


              > 
              <Button  icon={<UploadOutlined />}>Upload profile pic</Button>
              </Upload >
              </div>
        <button type="submit" style={styles.button} onClick={(event) => addcaretaker(event)}>
  Create Profile
</button>
            </form>
          </div>
        </div>
        
      </section>
    </>
  );
};

const styles = {
  container: {
    // padding: '2rem',
    // backgroundColor: 'red',
    // backgroundColor: '#f9f9f9',
    gap: '2rem',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    marginTop: '2rem',
    
  },
  outercont: {
    display: 'flex',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: '2rem',

  },
  leftColumn: {
    backgroundColor:"yellow"
    
  },
  rightColumn: {
    flex: 1,
  },
  subheading: {
    color: '#333',
    fontSize: '2rem',
    

  },
  photoUpload: {
    margin: '1rem 0',
  },
  photoInput: {
    display: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '400px',
    height: '4vh',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  textarea: {
    margin: '0.5rem 0',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
    width: '400px',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '20px',
    height:"4vh"
  },
  button: {
    margin: '1rem 0',
    padding: '0.5rem',
    backgroundColor: 'grey',
    color: 'blue',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
    width: '400px',
    fontSize: '25px',
  },
  rl: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10rem',
  },
  middleColumn: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10rem',
  },
  upbtn: {
    margin: '1rem 0',
    padding: '0.5rem',
    backgroundColor: '#cedcf2',
    color: 'blue',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
    width: '400px',
    fontSize: '25px',
    
  },
};

export default CaregiverProfile;
