import { useEffect, useState } from 'react';
import Rprofile from "../../Components/Receiver/RprofileBox";
import RecieverTable from "../../Components/Receiver/Reciever_dash_table";
import { database } from '../../firebase_config';
import { collection, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import helphand from '../../assets/back.png';

const DashboardApp = ({ mydetails }) => {
  const [recdata, setRecdata] = useState([]);
  const [filtereddata, setFiltereddata] = useState([]);

  const inputsearch = () => {
    const formvalues = document.querySelectorAll('input');
    const data = {};
    formvalues.forEach((input) => {
      if (input.value !== "")
        data[input.name] = input.value;
    });

    let filtered = recdata;

    if (data.yearsOfExperience) {
      const minExp = parseInt(data.yearsOfExperience, 10);
      filtered = filtered.filter(item => item.yearsOfExperience >= minExp);
    }

    if (data.availability) {
      const availabilityKeywords = data.availability.toLowerCase().split(',');
      filtered = filtered.filter(item =>
        availabilityKeywords.some(keyword => item.availability.toLowerCase().includes(keyword.trim()))
      );
    }

    if (data.servicesOffered) {
      const services = data.servicesOffered.split(',').map(service => service.trim());
      filtered = filtered.filter(item => services.every(service => item.servicesOffered.includes(service)));
    }

    if (data.age) {
      const maxAge = parseInt(data.age, 10);
      filtered = filtered.filter(item => item.age <= maxAge);
    }

    if (Object.keys(data).length === 0) {
      // If no fields are filled, return all data
      setFiltereddata([]);
    } else {
      setFiltereddata(filtered);
    }
  }

  const fetchthegivers = async () => {
    try {
      // fetch data from caretakers collection
      const querySnapshot = await getDocs(collection(database, 'caretakers'));
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setRecdata(arr);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchthegivers();
  }, []); // Empty dependency array

  const handleFormReset = (e) => {
    e.preventDefault();
    setFiltereddata([]);
  }

  return (
    <div style={styles.maincont}>
      <div>

      </div>
      <div style={styles.content}>
        <div style={styles.dashcont}>
          <div style={styles.abovecont}>
            <div style={styles.inputforms}>
              {/* Wrap the form inside the input form container */}
              <form style={styles.form} name="searchForm" onReset={handleFormReset}>
                <div>
                  <label style={styles.label} htmlFor="experience">Experience yrs:</label>
                  <input type="text" id="experience" name="yearsOfExperience" placeholder="Years of Experience" style={styles.input} />
                </div>
                <div>
                  <label style={styles.label} htmlFor="availability">Availability:</label>
                  <input type="text" id="availability" name="availability" placeholder="Availability(eg.weekdays)" style={styles.input} />
                </div>
                <div>
                  <label style={styles.label} htmlFor="servicesOffered">Services Offered:</label>
                  <input type="text" id="servicesOffered" name="servicesOffered" placeholder="Enter offered services" style={styles.input} />
                </div>
                <div>
                  <label style={styles.label} htmlFor="age">Age:</label>
                  <input type="text" id="age" name="age" placeholder="Enter age" style={styles.input} />
                </div>
                <button type="button" style={styles.searchButton} onClick={inputsearch}>Search</button> {/* Set type to "button" */}
                <button type="reset" style={styles.resetButton}>Reset</button> {/* Set type to "reset" */}
              </form>
            </div>
          </div>
          <div style={styles.tablecont}>
            <RecieverTable tabdat={filtereddata.length !== 0 ? filtereddata : recdata} myemail={mydetails.email} mydet={{ name: mydetails.name, imageurl: mydetails.imageUrl }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  maincont: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '80%',
    backgroundImage: `url(${helphand})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    position: 'absolute',
    top: '0',
  },
  content: {
    flex: 1, // Take remaining space
    display: 'flex',
    width: '100%',
    margin: 'auto',
  },
  dashcont: {
    width: '100%',
  },
  tablecont: {
    width: '90%',
    margin: 'auto',
  },
  abovecont: {
    height: '35vh',
    marginBottom: '20px',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    flexWrap: 'wrap',
    padding: '10px',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
    marginBottom: '10px',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '18px',
  },
  searchButton: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  resetButton: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  inputforms: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexWrap: 'wrap',
    borderRadius: '15px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: '80%',
    margin: 'auto',
    maxWidth: '1200px', // Set maximum width for input forms container
  },
  label: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'black',
    marginRight: '10px',
  },
};

export default DashboardApp;
