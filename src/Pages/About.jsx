import Navbar from '../Components/Navbar';
import hand from '../assets/hands.jpg';
const about=()=>{
    return(
        <>
        <Navbar/>
        <div style={styles.maincont}>
            <div style={styles.para}>
            <h1 style={styles.h}>About Us</h1>
            <p>Welcome to Meet My Helper, your trusted source for compassionate care and personalized support. Our mission is to provide high-quality caregiving services to individuals and families in need. With a team of dedicated professionals, we strive to make a positive difference in the lives of our clients by offering reliable assistance and genuine care.</p>
                <p>At Meet My Helper, we understand the importance of maintaining independence and dignity while receiving care. That's why our caregivers are trained to provide respectful and compassionate assistance tailored to each individual's unique needs and preferences.</p>
                <p>Whether you're looking for assistance with daily tasks, companionship, or specialized care, we're here to help. Contact us today to learn more about our services and how we can support you and your loved ones.</p>
            </div>
            <div style={styles.image}>
                <img src={hand} alt="" width={350} height={350} style={{borderRadius:"700px" , padding:"10px"}}/>
            </div>
        </div>
        <footer style={styles.footer}>
                <p>&copy; 2024 Meet My Helper. All rights reserved.</p>
            </footer>
        </>
    )
}
export default about;

const styles = 
{
    maincont:
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: '2rem',
        paddingTop: '2rem',
        paddingLeft: '2rem',
        // margin_left: '10rem',
        width: '90%',
        

    },
    image:
    {
        
        width:'40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border_radius: '50px',
        
        // background: 'url(../assets/hands.jpg)',
    },
    para:
    {
        width: '70%',
        height: '60%',
        fontSize: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        border_radius: '5px',
        color: 'grey',
        fontWeight: 'bold',
        // background: 'url(../assets/hands.jpg)',
    },
    h:
    {
        color: 'black',
        textAlign: 'center',
        // backgroundColor: 'lightgrey',
        height: '6vh',
        display:'flex',
        justifyContent: 'right',
        alignItems: 'center',
        fontSize: '20',
        fontWeight: 'bold',
        
       
       margin: '0 0 0 0'
    },
    footer: {
        backgroundColor: '#cef0ef',
        color: 'black',
        textAlign: 'center',
        // padding: '20px',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        // height:"20px",
        margin: '0',
        justifyContent: 'center',
        alignItems: 'center',
    },

}