import React from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";

function NavBar() {
  return (
    <Router>
      <div>
        <NavLink to="/location">Location</NavLink>
        <NavLink to="/diseases">Diseases</NavLink>
        <NavLink to="/Emergencies">Emergencies</NavLink>
        <NavLink to="/donations">Donations</NavLink>
      </div>
    </Router>
  );
}

export default NavBar;
