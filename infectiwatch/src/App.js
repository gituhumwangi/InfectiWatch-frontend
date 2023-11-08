import React from 'react';
import NavBar from './components/NavBar.js';
import Diseases from './components/Diseases';
import Donations from './components/Donations';
import Review from './components/Reviews';
import Location from './components/Location';
import Emergencies from './components/Emergencies';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';

function App() {
  return (
    // <BrowserRouter>
    <header>
      {/* <NavBar/> */}
      <Diseases/>
      <Location/>
      <Review/>
    </header>
    //   // <NavBar />
    //   //   <Route path="/diseases" element={<Diseases />} />
    //   //   <Route path="/donations" element={<Donations />} />
    //   //   <Route path="/reviews" element={<Reviews />} />
    //   //   <Route path="/location" element={<Location />} />
    //   //   <Route path="/emergencies" element={<Emergencies />} />
    //   //   <Route path="/signup" element={<Signup />} />
    //   //   <Route path="/login" element={<Login />} />
    //   //   <Route path="/homepage" element={<Homepage />} />
    // // </BrowserRouter>
  );
}

export default App;