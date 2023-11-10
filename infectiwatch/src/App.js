import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Admin from './components/Admin';
import DiseaseManagement from './components/DiseaseManagement';
import Reviews from './components/Reviews'
import Logout from './components/Logout'
import Emergencies from './components/Emergencies'
import Diseases from './components/Diseases'
import Donations from './components/Donations';

function App() {
  return (
    <div className="App">
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/navbar" element={<NavBar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/diseasemanagement" element={<DiseaseManagement />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/diseases' element={<Diseases />} />
          <Route path='/' element={<Welcome />} />
          <Route path='/Emergencies' element={<Emergencies />} />
          <Route path='/donations' element={<Donations />} />
          


        </Routes>
      {/* </Router> */}

    </div>
  );
}


export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Welcome from './components/Welcome';
// import NavBar from './components/NavBar';
// import Footer from './components/Footer';
// import Admin from './components/Admin';
// import DiseaseManagement from './components/DiseaseManagement';
// import DiseaseMap from './components/DiseaseMap';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Welcome />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/navbar" element={<NavBar />} />
//           <Route path="/footer" element={<Footer />} />
//           <Route path="/admin" element={< Admin />} />
//           <Route path="/diseasemanagement" element={<DiseaseManagement />} />
//           <Route path="/diseasemap" element={<DiseaseMap />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

