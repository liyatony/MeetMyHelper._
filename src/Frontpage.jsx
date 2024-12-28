import React, { useRef} from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import eat from './assets/parallax/eat.jpg';
import globe from './assets/parallax/globe.jpg';
import heart from './assets/parallax/heart.jpg';
import leaf from './assets/parallax/leaf.jpg';
import sponge from './assets/parallax/sponge.jpg';
import wheelchair from './assets/parallax/wheelchair.jpg';
import Navbar from './Components/Navbar';

// Little helpers ...


const Frontpage = () => {
  const parallax = useRef(null);
  return (
    <div style={styles.outer}>
      <div style={styles.nav}>
        <Navbar />
      </div>
      <div style={styles.parall}>

      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer offset={0} speed={1} style={styles.off1} />
        <ParallaxLayer offset={1} speed={1} style={styles.mid} />
        <ParallaxLayer offset={2} speed={1} style={styles.offend} />

        <ParallaxLayer offset={1.3} speed={-0.1} style={{ pointerEvents: 'none' }}>
          <div style={styles.sponge}>
            {/* <img src={sponge} style={{ width: '25%', marginLeft: '70%' ,borderRadius:'10%'}} /> */}
            Find the perfect helper for your every need
            </div>
        </ParallaxLayer>


        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={leaf} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={leaf} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={leaf} style={{ display: 'block', width: '30%', marginLeft: '70%' }} />
          <img src={leaf} style={{ display: 'block', width: '30%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={leaf} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={leaf} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        </ParallaxLayer>

        {/* <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={leaf} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={leaf} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src={leaf} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer> */}

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={leaf} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={leaf} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={1.5}
          style={styles.globe}
          >
            <div style={styles.globetex}>

            Help is here, whenever you need it
            </div>
          </ParallaxLayer>
          
        

        <ParallaxLayer  offset={0.3} speed={-2} style={styles.top}>
          <div style={styles.topin}>
          Simplify your life with Meet My Helper
          </div>
        </ParallaxLayer>

        

        

        <ParallaxLayer
          offset={2}
          speed={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => parallax.current.scrollTo(0)}
        >
        <div style={styles.getstart}>
        Welcome to Meet My Helper, your trusted source for compassionate care and personalized support. Our mission is to provide high-quality caregiving services to individuals and families in need. With a team of dedicated professionals, we strive to make a positive difference in the lives of our clients by offering reliable assistance and genuine care.
        </div>
        </ParallaxLayer>
      </Parallax>
      </div>
    </div>
  );
};

export default Frontpage;


const styles={
  off1:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundImage: 'url(' +heart + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  outer: {
    backgroundColor: '#bcdff7',
    minHeight: '100vh',
    width: '100%',
    
   
  },
  head1: {
    // backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em',
    color: '#000',
    fontFamily: 'sans-serif',
    height: '10%',
    // width: '100%',
  },
  globe: {
    width: '20%',
    marginLeft: '6%',
    height: '20%',
    backgroundImage: 'url(' +globe + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10%',
    position: 'relative',
    top: '-35%',
  },
  nav:{
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '100',
  },
  parall:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  },
  getstart:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: '50%',
    width: '30%',
    borderRadius: '20px',
    padding: '20px',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    fontSize: '20px',
    color: '#5702f5',
    fontWeight: 'bold',
    
  },
  top:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    height: '10%',
    width: '60%',
    position:"relative",
    left:"20%"
    
    
  },
  topin:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    height: '100%',
    width: '100%',
    borderRadius: '20px',
    padding: '25px',
    cursor: 'pointer',
    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    fontSize: '70px',
    color: '#4f0324',
    fontWeight: 'bold',
    position:"relative",
    top:"-210%"
    
  },
  offend:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    borderRadius: '20px',
    backgroundImage: 'url(' +wheelchair + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    

  },
  mid:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    borderRadius: '20px',
    backgroundImage: 'url(' +eat + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  sponge:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
    width: '40%',
    position: 'relative',
    left: '50%',
    borderRadius: '2px',
    backgroundImage: 'url(' +sponge + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: '0.6',
    color: 'red',
    fontWeight: 'bold',
    fontSize: '30px',
  },
  globetex:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
    width: '80%',
    position: 'relative',
    left: '20%',
    top: '40%',
    borderRadius: '2px',
    // backgroundImage: 'url(' +globe + ')',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    opacity: '0.5',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '30px',
    texalign: 'center',
  },
  
}







