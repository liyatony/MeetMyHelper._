import React from 'react';

const Review_card = ({review}) => {
    // Calculate the number of filled stars based on the rating value
    const rating=review.rating;
    const filledStars = Math.floor(rating);
    // Calculate the number of half stars
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
    // Calculate the number of empty stars
    const emptyStars = 5 - filledStars - halfStar;

    return (
        <div style={styles.card}>
            <div style={styles.head}>
                <div style={styles.reviewerInfo}>
                    <img src= {review.reviewer_photo?review.reviewer_photo:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="Reviewer" style={styles.reviewerPhoto} />
                    <div style={styles.reviewerName}>{review.reviewer_name}</div>
                </div>
                <div style={styles.rating}>
                    {/* Render filled stars */}
                    {[...Array(filledStars)].map((_, index) => (
                        <span key={index} style={styles.star}>★</span>
                    ))}
                    {/* Render half star if needed */}
                    {halfStar === 1 && <span style={styles.star}>★</span>}
                    {/* Render empty stars */}
                    {[...Array(emptyStars)].map((_, index) => (
                        <span key={index} style={{ ...styles.star, opacity: 0.3 }}>★</span>
                    ))}
                </div>
            </div>
            <div style={styles.body}>
                <div style={styles.experience}>{review.text}</div>
            </div>
        </div>
    );
}

export default Review_card;

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        // margin: 'auto',
        // backgroundColor: '#f5f5f5',
        // backgroundColor: 'transparent',
        // backgroundColor: 'rgba(100, 100, 128,0.9)',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '10px',
        padding: '20px',
        height: 'auto',
        boxShadow: '0 0 20px #ccc',
        // marginBottom: '30px',
        

    },
    head: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px',
        borderBottom: '4px solid #ccc',
        color:"#64eddf"
    },
    reviewerInfo: {
        display: 'flex',
        alignItems: 'center',
        

    },
    reviewerPhoto: {
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        marginRight: '10px',
        position : 'relative',
        top: '60%',
        left:'-50%'

    },
    reviewerName: {
        fontSize: '40px',
        fontWeight: 'bold',
        marginLeft: '30px',
        position : 'relative',
        // top: '60%',
        left: '-20%',
    },
    rating: {
        fontSize: '44px',
        color: '#FFD700', // Gold color for stars
    },
    star: {
        marginRight: '3px',
    },
    body: {
        width: '100%',
        height:'100%'
    },
    experience: {
        fontSize: '20px',
        textAlign: 'justify',
        fontWeight: 'bold',

    }
}
