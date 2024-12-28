import { useLocation } from 'react-router-dom';
import Reviewprofile from '../../Components/Receiver/Reviewprofile';
import Show_reviews from '../../Components/Receiver/Show_reviews';
import chain from '../../assets/chain.jpg';
const GiverView = () => {
    const { state } = useLocation();
    // console.log("state>>>", state);

    if (!state || !state.e) {
        return (
            <div style={styles.maincont}>
                <p>No giver details found.</p>
            </div>
        );
    }

    const giverDetails = state.e; // Assuming e contains giver details

    return (
        <div style={styles.maincont}>
           <div style={styles.detail}>
            <Reviewprofile giverdet={giverDetails} myem={state.myemail} mydet={state.mydet}/>
           </div>
           <div style={styles.review}>
           <Show_reviews myem={state.myemail} giverem={giverDetails.email}/> 
           </div>
        </div>
    );
};

export default GiverView;



const styles={
    maincont:{
        display: 'flex',
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        // backgroundColor: '#f0f0f0',
        backgroundImage: `url(${chain})`,
        
    },
    detail:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'transparent',
        height: '80vh',
        width: '80%',
        // backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        marginTop: '20px',

        // border: '10px solid red',
    },
    review:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        width: '80%',
        // backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        // border: '10px solid green',
        marginBottom: '20px',
        marginTop: '20px',
    },

}