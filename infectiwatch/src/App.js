import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Logout from './components/Logout.js';
import NavBar from './components/NavBar.js';
import Diseases from './components/Diseases';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Emergencies from './components/Emergencies';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';

function App() {
  return (
    <div className='App'>
      <NavBar />
   <Routes>
   <Route path="/"  element={<Homepage/>} />
     <Route path="/diseases" element={<Diseases />} />
     <Route path="/reviews" element={<Reviews />} />
     <Route path="/location" element={<Location />} />
     <Route path="/emergencies" element={<Emergencies />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout/>} />
  </Routes>
    </div>
  );
}

export default App;