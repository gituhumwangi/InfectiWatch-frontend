import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from '../components/Welcome';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Admin from '../components/Admin';
import DiseaseManagement from '../components/DiseaseManagement';
import Reviews from '../components/Reviews'
import Location from '../components/Location'
import Emergencies from '../components/Emergencies'
import Diseases from '../components/Diseases'

const AppRoutes = () => {
    return (
      <Routes>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/navbar" element={<NavBar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/diseasemanagement" element={<DiseaseManagement />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/diseases' element={<Diseases />} />
          <Route path='/' element={<Welcome />} />
          <Route path='/Emergencies' element={<Emergencies />} />
          {/* <Route path='/donations' element={<Donations />} /> */}
          <Route path='/location' element={<Location/>} />
      </Routes>
    );
  };
  
  export default AppRoutes;