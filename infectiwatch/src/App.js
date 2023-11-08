import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter once
import NavBar from './components/NavBar';
import Diseases from './components/Diseases';
import Donations from './components/Donations';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Emergencies from './components/Emergencies';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';

function App() {
  return (
    // <BrowserRouter> 
      // <NavBar />
      <Diseases />
      // <Routes>
      //   <Route path="/diseases" element={<Diseases />} />
      //   <Route path="/donations" element={<Donations />} />
      //   <Route path="/reviews" element={<Reviews />} />
      //   <Route path="/location" element={<Location />} />
      //   <Route path="/emergencies" element={<Emergencies />} />
      //   <Route path="/signup" element={<Signup />} />
      //   <Route path="/login" element={<Login />} />
      //   <Route path="/homepage" element={<Homepage />} />
      // </Routes>
    // </BrowserRouter>
  );
}

export default App;