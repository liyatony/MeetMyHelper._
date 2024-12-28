import { useLocation } from 'react-router-dom';
import Giverprofile from '../../Components/Giver/GiverProfile';
import Giverreviews from '../../Components/Giver/GiverReviews';
import GiverApoints from '../../Components/Giver/GiverApoints';
import { useState } from 'react';
import { useEffect } from 'react';
import { database,auth } from '../../firebase_config';
import { collection, onSnapshot, query, where,getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import dashimg from '../../assets/icons/dash.png'
import logout from '../../assets/icons/logout.png'
import profile from '../../assets/icons/user.png'
import status from '../../assets/icons/status.png'
import taker from '../../assets/icons/taker.png'
import ToggleDashbord from '../../Components/Giver/ToggleDashbord';
import back from '../../assets/back.png'
// const Giver_dash = () => {
//     const { state } = useLocation();
//     const [currentUser] = useState(state.email);
//     const [activePage, setActivePage] = useState('profile'); // State to track active page

//     const [appoints, setapoints] = useState([]);

//     const fetchapoints = async () => {
//         try {
//             const q = query(collection(database, 'appointments'), where('care_taker_email', '==', currentUser));
//             const unsubscribe = await onSnapshot(q, (snapshot) => {
//                 const arr = [];
//                 snapshot.forEach((doc) => {
//                     arr.push(doc.data());
//                 });
//                 setapoints(arr);
//             });
//             return unsubscribe;
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     useEffect(() => {
//         fetchapoints();
//     }, []);

//     const handlePageChange = (pageName) => {
//         setActivePage(pageName);
//     };

//     return (
//         <div style={styles.maincont}>
//             <div style={styles.buttons}>
//                 <button style={styles.btn} onClick={() => handlePageChange('profile')}>Profile</button>
//                 <button style={styles.btn} onClick={() => handlePageChange('reviews')}>Reviews</button>
//                 <button style={styles.btn} onClick={() => handlePageChange('appointments')}>Appointments</button>
//             </div>
//             <div style={styles.body}>
//                 {/* Profile Page */}
//                 <div key="profile" style={{ ...styles.page, ...styles.detail, visibility: activePage === 'profile' ? 'visible' : 'hidden', opacity: activePage === 'profile' ? 1 : 0 }}>
//                     <Giverprofile myemail={currentUser} />
//                 </div>
//                 {/* Reviews Page */}
//                 <div key="reviews" style={{ ...styles.page, ...styles.review, visibility: activePage === 'reviews' ? 'visible' : 'hidden', opacity: activePage === 'reviews' ? 1 : 0 }}>
//                     <Giverreviews giverem={currentUser} />
//                 </div>
//                 {/* Appointments Page */}
//                 <div key="appointments" style={{ ...styles.page, ...styles.apoint, visibility: activePage === 'appointments' ? 'visible' : 'hidden', opacity: activePage === 'appointments' ? 1 : 0 }}>
//                     <GiverApoints giverem={currentUser} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Giver_dash;

// const styles = {
//     maincont: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%',
//         // overflowX: 'scroll',
//     },
//     page: {
//         maxWidth: '90%',
//         maxHeight: '90%',
//         transition: 'opacity 0.3s ease-in-out',
//         // margin: '10px',
//     },
//     detail: {
//         position: 'absolute',
//         top: '15%',
//         left: '10%',
//         width: '80%',
//     },
//     review: {
//         position: 'absolute',
//         top: '10%',
//         left: '10%',
//         width: '80%',
        
//     },
//     apoint: {
//         position: 'absolute',
//         top: '6%',
//         left: '4%',
//         width: '100%',
//     },
//     buttons: {
//         backgroundColor: "#cef0ef",
//         position: "fixed",
//         top: '0',
//         width: "100%",
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'right',
//         height: '10%',
//     },
//     btn: {
//         backgroundColor: '#443157',
//         color: 'white',
//         padding: '10px',
//         margin: '10px',
//         borderRadius: '10px',
//         border: 'none',
//         cursor: 'pointer',
//         fontSize: '20px',
//     },
// };







const Giver_dash=()=>{
    const { state } = useLocation();
    const [currentUser] = useState(state.email);
    const navigate = useNavigate();
    console.log("state", state.email);

    const [mydetails, setmydetails] = useState([]);
    const [activeComponent, setActiveComponent] = useState('dashboard'); // Track the active component
    const log_out =()=>
    {
        console.log("LOG clickeed");
        auth.signOut();
        navigate("/login");

    }
    const fetchmydetails = async() => {
        try
        {
            const querySnapshot = await getDocs(
                query(collection(database, 'caretakers'), where("email", "==", state.email))
                // Use 'query' to create a query with a filter using 'where'
            );
            const arr = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            console.log("---",arr);
            setmydetails(arr[0]);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    useEffect(() =>
    {
        fetchmydetails();
    }
    , []); 
    console.log("mydet",mydetails);
    const toggleComponent = (component) => {
        setActiveComponent(component);
    }
    return(
        <div style={styles.outer}>
            <div style={styles.sidebar}>
                <div style={styles.profile}>
                    <div >
                        <img style={styles.propic}src={ mydetails.imageUrl?mydetails.imageUrl:"https://cdni.iconscout.com/illustration/premium/thumb/female-user-image-8110250-6515859.png?f=webp"} alt="" />
                        <label style={styles.proname} htmlFor="text">{mydetails.fullName}</label>
                        <div style={styles.header}>Care  Giver</div>
                    </div>

                </div>
                <ul style={styles.ul}>
                    <li style={styles.li} onClick={() => toggleComponent('dashboard')}><img style={styles.img} src={dashimg} alt="" />DashBoard</li>
                    <li style={styles.li} onClick={() => toggleComponent('profile')}><img style={styles.img} src={profile} alt="" />Profile</li>
                <li style={styles.li} onClick={() => toggleComponent('reviews')}><img style={styles.img} src={taker} alt="" />Reviews </li>
                    <li style={styles.li} onClick={() => toggleComponent('apoints')}><img style={styles.img} src={status} alt="" />Appointments</li>
                    <li style={styles.li}  onClick={() => log_out()}><img style={styles.img} src={logout} alt="" />Logout</li>
                </ul>
            </div>
            <div style={styles.body}>
            {/* Render component based on activeComponent state */}
            {activeComponent === 'dashboard' && <ToggleDashbord myemail={currentUser} myname={mydetails.fullName}/>}
            {activeComponent === 'apoints' && <GiverApoints giverem={currentUser} />}
                {activeComponent === 'profile' && <Giverprofile myemail={currentUser} />}
                {activeComponent === 'reviews' && <Giverreviews giverem={currentUser} />}
                {/* Add other components here */}
            </div>
        </div>
    )
}
export default Giver_dash;


const styles={
    outer:{
        display:'flex',
        flexDirection:'row',
        height:'100vh'

    },
    sidebar:{
        width:'20%',
        backgroundColor:'grey'
    },
    
    ul:{
        listStyleType:'none',

        display:'flex',
        flexDirection:'column',
        
        
    },
    li:{
        padding:'10px',
        margin:'20px',
        // backgroundColor:'red',
        fontSize:'20px',
        fontWeight:'bold',
        height:'30px',
        display:'flex',
        alignItems:'center',
        // justifyContent:'space-around', 
        
        cursor:'pointer',
    },
    profile:{
        height:'200px',
        width:'100%',
        backgroundColor:'#504e57',
        paddingTop:'1px'
        
        
    },
    img:{
        height:'30px',
        width:'30px',
        // marginRight:'10px',
        display:'flex',
        
    },
    propic:{
        height:'100px',
        width:'100px',
        borderRadius:'50%',
        margin:'auto',
        marginTop:'20px',
        display:'flex',
    },
    proname:{
        textAlign:'center',
        fontSize:'20px',
        fontWeight:'bold',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'white',
        marginTop:'10px',
    },
    body:{
        width:'80%',
        backgroundColor:'#393742',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage: `url(${back})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        // marginTop:'40px',
        // marginBottom:'90px',
    },
    header:{
        textAlign:'center',
        color:'white',
        fontSize:'20px',
        fontWeight:'bold',
        marginTop:'10px',
    }
}
