import dashimg from '../../assets/icons/dash.png'
import logout from '../../assets/icons/logout.png'
import profile from '../../assets/icons/user.png'
import status from '../../assets/icons/status.png'
import taker from '../../assets/icons/taker.png'
import DashboardApp from '../../Pages/Reciever/Receiver_dash'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { database ,auth} from '../../firebase_config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Rprofile from './RprofileBox'
import ApointAccept from './ApointAccept';
import { useNavigate } from 'react-router-dom'
import ToggleDash from './ToggleDash'
import back from '../../assets/back.png'



const Recieverprevdash=()=>{
    const navigate = useNavigate();
    const {state}=useLocation();
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
                query(collection(database, 'carereceivers'), where("email", "==", state.email))
                // Use 'query' to create a query with a filter using 'where'
            );
            const arr = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
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
    // console.log("mydet",mydetails);
    const toggleComponent = (component) => {
        setActiveComponent(component);
    }
    return(
        <div style={styles.outer}>
            <div style={styles.sidebar}>
                <div style={styles.profile}>
                    <div >
                        <img style={styles.propic}src={ mydetails.imageUrl?mydetails.imageUrl:"https://cdni.iconscout.com/illustration/premium/thumb/female-user-image-8110250-6515859.png?f=webp"} alt="" />
                        <label style={styles.proname} htmlFor="text">{mydetails.name}</label>
                        <div style={styles.header}>Care  Receiver</div>
                    </div>

                </div>
                <ul style={styles.ul}>
                <li style={styles.li} onClick={() => toggleComponent('dashboard')}><img style={styles.img} src={dashimg} alt="" /> DashBoard</li>
                    <li style={styles.li} onClick={() => toggleComponent('profile')}><img style={styles.img} src={profile} alt="" />Profile</li>
                    <li style={styles.li} onClick={() => toggleComponent('care-takers')}><img style={styles.img} src={taker} alt="" />Care Takers</li>
                    <li style={styles.li} onClick={() => toggleComponent('appointment-status')}><img style={styles.img} src={status} alt="" />Appointments</li>
                    <li style={styles.li}  onClick={() => log_out()}><img style={styles.img} src={logout} alt="" />Logout</li>
                </ul>
            </div>
            <div style={styles.body}>
            {/* Render component based on activeComponent state */}
            {activeComponent === 'dashboard' && <ToggleDash myemail={mydetails.email}/>}
            {activeComponent === 'care-takers' && <DashboardApp mydetails={mydetails} />}
                {activeComponent === 'profile' && <Rprofile mydetails={mydetails} />}
                {activeComponent === 'appointment-status' && <ApointAccept myem={mydetails.email} />}
                {/* Add other components here */}
            </div>
        </div>
    )
}
export default Recieverprevdash;


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
        // justifyContent:'space-between', 
        
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
        backgroundImage: `url(${back})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        // marginTop:'40px',
        // marginBottom:'90px',
    },
    header:{
        color:'white',
        fontSize:'20px',
        fontWeight:'bold',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10px',
    }
}