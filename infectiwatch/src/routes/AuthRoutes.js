import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";

const AuthRoutes = ({ handleLogin }) => {
    return (
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  };
  
  export default AuthRoutes;