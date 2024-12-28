import React from 'react';
import Loading from '../Loader';

const ApointAcard = ({ apoints }) => {
    return (
        <div className="statusbox" style={styles.statusbox}>
            <div style={styles.scrollcont}>
                {apoints.map((apoint, index) => (
                    <div key={index} style={styles.appointmentCard}>
                        <div style={styles.cardname}>
                            <img style={styles.cardimg} src={apoint.care_taker_image ? apoint.care_taker_image : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="care_taker" width="100" height="100" />
                            <h3 style={styles.cardtaker}>{apoint.care_taker_name}</h3>
                        </div>
                        <div style={styles.cardbody}>
                            {apoint.request_accepted || apoint.request_rejected ? (
                                <div>
                                    <p>
                                        <b>Status:</b>{" "}
                                        <span style={{...styles.ar, color: apoint.request_accepted ? "green" : "red" }}>
                                            {apoint.request_accepted && !apoint.request_rejected? "Accepted" : "Rejected"}
                                        </span>
                                    </p>
                                    
                                </div>
                            ) : (
                                <>
                                    <p style={{ color: "#f27405", fontSize: "30px" }}>Pending ....</p>
                                    <Loading />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApointAcard;


const styles={
    statusbox:{
        
        width:'100%',
        height:'95%',
        
        // marginTop:'69px',
        padding: '3px',
    },
    scrollcont:{
        maxHeight:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        
        overflowY:'scroll',
        scrollbarWidth:'none',
    },
    appointmentCard:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        width:'90%',
        height:'100%',
        backgroundColor:'#f0f0f0',
        margin:'5px',
        padding:'5px',
        borderRadius:'5px',
    },
    cardname:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:'100%',
        
       
    },
    cardimg:{
        borderRadius:'50%',
        // position:'relative',
        // top:'-190px',
    },
    cardtaker:{
        // marginLeft:'10px',
        // position:"relative",
        // top:"-190px",
        // left:"80px",
        fontSize:"40px",
        
        


    },
    cardbody:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        // border:'5px solid red'
    },
    ar:{
        fontSize:'30px',
        fontWeight:'bold',
    }
}
