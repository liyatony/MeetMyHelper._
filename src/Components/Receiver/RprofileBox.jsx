import React from 'react';
import { useState ,useEffect} from 'react';
import back from '../../assets/back.png'


const Rprofile = ({mydetails}) => {
        // console.log("mydetails {}", mydetails);
    return (
        // <div style={styles.outer}>
        //     <h1 style={styles.heading}>{mydetails.name}</h1>
        //     <div style={styles.imageBox}>
        //         <img src={mydetails.imageUrl?mydetails.imageUrl:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="Profile" style={styles.image} />
        //     </div>
        //     <div style={styles.infoBox}>
        //         <div style={styles.label}>Age</div>
        //         <div style={styles.value}>{mydetails.age}</div>
        //     </div>
        //     <div style={styles.infoBox}>
        //         <div style={styles.label}>Contact Num</div>
        //         <div style={styles.value}>{mydetails.telephone}</div>
        //     </div>
            
        //     <div style={styles.infoBox}>
        //         <div style={styles.label}>Allergy</div>
        //         <div style={styles.value}>{mydetails.allergy}</div>
        //     </div>
        //     <div style={styles.infoBox}>
        //         <div style={styles.label}>Care Preference</div>
        //         <div style={styles.value}>{mydetails.pref_care}</div>
        //     </div>
        //     <div style={styles.infoBox}>
        //         <div style={styles.label}>Physician</div>
        //         <div style={styles.value}>{mydetails.physician}</div>
        //     </div>
        //     <div style={styles.infoBox}>
        //         <div style={styles.label}>Insurance</div>
        //         <div style={styles.value}>{mydetails.health_inssure}</div>
        //     </div>
            
           
        // </div>
        <div style={styles.outer}>
            <div style={styles.namebord}>
            <div style={styles.imageBox}>
                 <img src={mydetails.imageUrl?mydetails.imageUrl:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="Profile" style={styles.image} />
            </div>
            <div style={styles.borddet}>

            <h1 style={styles.heading}>{mydetails.name}</h1>
            <label style={styles.label} htmlFor="text">{mydetails.age}</label>
            <label style={styles.label} htmlFor="text">{mydetails.address}</label>
            <label style={styles.label} htmlFor="text">{mydetails.email}</label>
            
            </div>
            </div>
            <div style={styles.body}>
                <div style={styles.bodcont}>
                <label style={styles.lab} htmlFor="text">Allergy:</label>
                    <div style={styles.value}>{mydetails.allergy}</div>
                    <label style={styles.lab} htmlFor="text">Daily Activities:</label>
                    <div style={styles.value}>{mydetails.daily_act}</div>
                    <label style={styles.lab} htmlFor="text">Diet Needed:</label>
                    <div style={styles.value}>{mydetails.diet_needed}</div>
                    <label style={styles.lab} htmlFor="text">Emergency Contact Name:</label>
                    <div style={styles.value}>{mydetails.emer_contact_name}</div>
                    <label style={styles.lab} htmlFor="text">Emergency Contact Number:</label>
                    <div style={styles.value}>{mydetails.emer_contact_num}</div>
                    <label style={styles.lab} htmlFor="text">Emergency Contact Relation:</label>
                    <div style={styles.value}>{mydetails.emer_contact_relation}</div>
                    <label style={styles.lab} htmlFor="text">Health Insurance:</label>
                    <div style={styles.value}>{mydetails.health_inssure}</div>
                    <label style={styles.lab} htmlFor="text">Language:</label>
                    <div style={styles.value}>{mydetails.language}</div>
                    <label style={styles.lab} htmlFor="text">Medical History:</label>
                    <div style={styles.value}>{mydetails.med_his}</div>
                    <label style={styles.lab} htmlFor="text">Medication:</label>
                    <div style={styles.value}>{mydetails.medication}</div>
                    <label style={styles.lab} htmlFor="text">Mobile Aid:</label>
                    <div style={styles.value}>{mydetails.mobi_aid}</div>
                    <label style={styles.lab} htmlFor="text">Physician:</label>
                    <div style={styles.value}>{mydetails.physician}</div>
                    <label style={styles.lab} htmlFor="text">Policy Number:</label>
                    <div style={styles.value}>{mydetails.policy_num}</div>
                    <label style={styles.lab} htmlFor="text">Preferred Care:</label>
                    <div style={styles.value}>{mydetails.pref_care}</div>
                    <label style={styles.lab} htmlFor="text">Preferred Contact:</label>
                    <div style={styles.value}>{mydetails.pref_contact}</div>
                    <label style={styles.lab} htmlFor="text">Special Requirements:</label>
                    <div style={styles.value}>{mydetails.spcl_req}</div>
                    <label style={styles.lab} htmlFor="text">Specialization:</label>
                    <div style={styles.value}>{mydetails.specialization}</div>
                    <label style={styles.lab} htmlFor="text">Telephone:</label>
                    <div style={styles.value}>{mydetails.telephone}</div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    // outer: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '100%',
    //     width: '100%',
    //     backgroundColor: '#fff',
    //     borderRadius: '10px',
    //     padding: '20px',
    //     marginBottom: '20px',
    //     marginTop: '20px',
    //     boxShadow: '0 0 20px #ccc',
        
        
    // },
    // heading: {
    //     marginBottom: '20px',
    // fontSize: '30px',
    // },
    // infoBox: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     marginBottom: '10px',
        
        
    // },
    // label: {
    //     fontWeight: 'bold',
    //     marginRight: '10px',
    //     width: '100%',
    //     display: 'flex',
    //     position:'relative',
    //     left: '0',
    //     fontSize: '15px',
    //     height: '20px',
    //     paddingBottom: '10px',
        
        
    // },
    // value: {
    //     border: '1px solid #ccc',
    //     padding: '5px',
    //     borderRadius: '5px',
    //     width: '100%',
    //     backgroundColor: '#f5f5f5',
    //     fontSize: '16px',
    //     fontWeight: 'bold',
    // },
    // imageBox: {
    //     marginTop: '20px',
    //     marginBottom: '20px',
    // },
    // image: {
    //     borderRadius: '80%',
    //     height: '150px',
    // },
    outer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'90%',
        width:'100%',
        // backgroundColor:'#fff',
        // borderRadius:'10px',
        padding:'20px',
        // marginBottom:'20px',
        // marginTop:'0px',
        backgroundImage:'url('+back+')',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backgroundSize:'cover',
        boxShadow:'0 0 20px #ccc',
        borderRadius:'20px',

        
    },
    heading:{
        marginBottom:'10px',
        fontSize:'30px',
        fontWeight:'bold',
    },
    imageBox:{
        // marginTop:'20px',
        // marginBottom:'20px',
        position:'relative',
        bottom:'30px',
    },
    image:{
        borderRadius:'80%',
        height:'150px',
        border:'15px solid grey',
    },
    namebord:{
        display:'flex',
        flexDirection:'column',
        width:'20%',
        boxShadow:'0 0 20px #ccc',
        position:'absolute',
        top:'40%',
        left:'25%',
        backgroundColor:'grey',
        borderRadius:'10px',
    },
    borddet:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        padding:'20px',
        marginBottom:'20px',
        fontSize:'30px',
        fontWeight:'bold',
        boxShadow:'0 0 20px #ccc',
        borderRadius:'10px',
        
    },
    label:{
        fontWeight:'bold',
        marginRight:'10px',
        width:'100%',
        
       
        
        fontSize:'25px',
        height:'20px',
        paddingBottom:'10px',
    },
    body:{
        width:'55%',
        backgroundColor:'255,255,255,0.8',
        height:'90%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        // bottom:'10px',
        left:'18%',
        // marginTop:'40px',
        // marginBottom:'90px',
        
    },
    bodcont:{
        backgroundColor:'255,255,255,0.8',
        maxWidth:'70%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:'20px',
        fontSize:'20px',
        overflowX:'scroll',
        fontWeight:'bold',
        // backgroundColor:'red',
        // paddingTop:'500px',
        // marginTop:'20px',
        flexWrap:'wrap',
        maxHeight:'90%',
        scrollbarWidth: 'none',
        marginRight:'10px',
    },
    lab:{
        fontWeight:'bold',
        marginRight:'10px',
        width:'100%',
        display:'flex',
        position:'relative',
        // left:'0',
        fontSize:'25px',
        height:'20px',
        paddingBottom:'10px',
        marginBottom:'10px',
        color:"#2d08d1"
        
    },
    value:{
        backgroundColor:"#82808a",
        border:'5px solid #ccc',
        // padding:'5px',
        borderRadius:'10px',
        width:'102%',
        // backgroundColor:'#f5f5f5',
        fontSize:'23px',
        fontWeight:'bold',
        marginBottom:'10px',
        marginRight:'10px'

    },

    
};

export default Rprofile;
