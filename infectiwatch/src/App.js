import React, { useState } from 'react';
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
import Location from './components/Location'
import Emergencies from './components/Emergencies'
import Diseases from './components/Diseases'
import {
  getAuthUserFromLocalStorage,
  removeAuthUserFromLocalStorage,
  storeAuthUserOnLocalStorage,
} from "./utils/functions";
import { MAIN_DOMAIN } from "./utils/constants";
import jwt_decode from "jwt_decode";
import { AuthContext } from './contexts/AuthContext';
// import Donations from './components/Donations';

function App() {

  const {AuthUser, SetAuthUser} = useState(null);


  const loginFromLocalStorage = () => {
    const storedAuthUser = getAuthUserFromLocalStorage();
    if (storedAuthUser) {
      setAuthUser(decode_jwt(storedAuthUser));
    }
  };

  const decode_jwt = (token) => {
    const decoded = jwt_decode(token);
    return decoded.sub;
  };

  const fetchUserFromServer = (userCredetials, isSubmitting) => {
    axios
      .post(`${MAIN_DOMAIN}/login`, userCredetials)
      .then((resp) => {
        if (resp.status === 200) {
          storeAuthUserOnLocalStorage(resp.data.access_token);
          setAuthUser(decode_jwt(resp.data.access_token));
        } else {
          toast.error("Username or Password is incorrect!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          storeAuthUserOnLocalStorage(null);
          setAuthUser(null);
        }
      })
      .catch((error) => {
        setAuthUser(null);
        toast.error("Error doing the login. Try later", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        isSubmitting(false);
      });
  };

  const handleLogin = (userCredetials, isSubmitting) => {
    fetchUserFromServer(userCredetials, isSubmitting);
  };

  useEffect(() => {
    loginFromLocalStorage();
  }, []);


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
          {/* <Route path='/donations' element={<Donations />} /> */}
          <Route path='/location' element={<Location/>} />
          


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

