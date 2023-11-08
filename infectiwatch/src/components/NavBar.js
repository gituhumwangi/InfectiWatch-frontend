import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; // Import BrowserRouter once
import Diseases from './Diseases';
import Donations from './Donations';
import Reviews from './Reviews';
import Location from './Location';
import Emergencies from './Emergencies';
import Homepage from './Homepage';

function NavBar() {

  return (
      <BrowserRouter>
    //        <Route path="/diseases" element={<Diseases />} />
    //   //   <Route path="/donations" element={<Donations />} />
    //   //   <Route path="/reviews" element={<Reviews />} />
    //   //   <Route path="/location" element={<Location />} />
    //   //   <Route path="/emergencies" element={<Emergencies />} />
    {/* //   //   <Route path="/signup" element={<Signup />} /> */}
    //   //   <Route path="/homepage" element={<Homepage />} />
    // // </BrowserRouter>
  );
}

export default NavBar;