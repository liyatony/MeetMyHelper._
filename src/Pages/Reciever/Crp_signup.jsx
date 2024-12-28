
import CarereceiverProfile from '../../Components/Receiver/Care_receiver_profile';

import { useLocation } from 'react-router-dom';
const Carereciever = ()=>
{
    const { state } = useLocation();
    console.log("state crp_S", state);
    return(
        <div>
            <nav style={styles.nav}>
            Meet My Helper
            </nav>
            <div style={styles.caregiver}>
                 <CarereceiverProfile eandp={state}/>
            </div>
            <footer style={styles.footer}>
                 <p>&copy; 2024 Meet My Helper. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Carereciever;

const styles =
{
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray',
        padding: '20px',
        height: '6vh',
        color:"black",
        fontSize: '50px',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        position : 'fixed',
        width: '100%',
        top:'0px',
        
    },
    caregiver: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 'auto',
        height: '106vh',
        
        backgroundColor: '#f2f2f2',
        // width: '50%',
        

        

    },
    footer: {
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
        // padding: '20px',
        position : 'fixed',
        bottom : '0',
        width : '100%',
        height:"20px",
        paddingBottom: '20px',

    },

}
