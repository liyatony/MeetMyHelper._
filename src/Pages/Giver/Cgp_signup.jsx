

import CaregiverProfile from "../../Components/Giver/Care_giver_profile";
import { useLocation } from 'react-router-dom';
const Ctp=()=>
{
    const { state } = useLocation();
    // console.log("state1", state);
    return(
        <div style={styles.outercont}>
           <nav style={styles.nav}>
           Meet My Helper
           </nav>
           <div style={styles.caregiver}>
                <CaregiverProfile eandp={state}/>
           </div>
           <footer style={styles.footer}>
                <p>&copy; 2024 Meet My Helper. All rights reserved.</p>
           </footer>
        </div>
    )
}

export default Ctp;

const styles = 
{
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#cbc8cf',
        // backgroundColor: 'grey',

        padding: '20px',
        height: '6vh',
        color:"black",
        fontSize: '40px',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        position: 'fixed',
        top:'0',
        width: '100%',

    },
    caregiver: {
        display: 'flex',
        width: '100%',
        height: '80%',
        overflow: 'scroll',
        // position:'absolute',
        
        marginTop: '80px',
        scrollbarWidth: 'none',
        

        
        

        // backgroundColor: 'red',
        

    },
    footer: {
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        position : 'fixed',
        bottom:"0",
        width: '100%',
    },
    outercont: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        // backgroundColor: 'blue',

    },

}