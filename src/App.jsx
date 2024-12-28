import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import About from './Pages/About'
import Services from './Pages/Services'
import Choice from './Pages/Choice'
import Care_taker from './Pages/Giver/Cgp_signup'
import Care_reciever from './Pages/Reciever/Crp_signup'
import Rdash from './Pages/Reciever/Receiver_dash'
import Gdash from './Pages/Giver/Giver_dash'
import GiverView from './Pages/Reciever/Giver_View_for_reciever'
import Appoint from './Components/Receiver/Appoint'
import Recieverprevdash from './Components/Receiver/Recieverprevdash'
import { auth } from './firebase_config'
import Frontpage from './Frontpage'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Frontpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* Routes accessible without authentication */}
          {!user && (
            <>
              
              <Route path="/" element={<Frontpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
            </>
          )}

          {/* Routes accessible only when authenticated */}
          {user && (
            <>
            
            <Route path="/choices" element={<Choice />} />
              <Route path="/cgp" element={<Care_taker />} />
              <Route path="/crp" element={<Care_reciever />} />
              <Route path="/rdash" element={<Rdash />} />
              <Route path="/gdash" element={<Gdash />} />
              <Route path="/gviewforr" element={<GiverView />} />
              <Route path="/appoint" element={<Appoint />} />
              <Route path="/recieverprevdash" element={<Recieverprevdash />} />
            </>
          )}

          {/* Redirect to login if user tries to access authenticated route without authentication */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
