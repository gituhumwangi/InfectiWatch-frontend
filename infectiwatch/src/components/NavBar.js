import React from "react";
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/diseases">Diseases</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li>
          <Link to="/location">Location</Link>
        </li>
        <li>
          <Link to="/emergencies">Emergencies</Link>
        </li>

        <li>
          <Link to="/login">Login</Link> {/* Change "signin" to "login" to match the route */}
        </li>
        <li>
          <Link to="/homepage">Homepage</Link>
        </li>
        <li>
          <Link to="logout">Logout</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar