import React, { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import Welcome from './components/Welcome';
import AuthRoutes from "./routes/AuthRoutes";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import {
  getAuthUserFromLocalStorage,
  removeAuthUserFromLocalStorage,
  storeAuthUserOnLocalStorage,
} from "./utils/functions";
import { MAIN_DOMAIN } from "./utils/constants";
import jwt_decode from "jwt-decode";
import { AuthContext } from './contexts/AuthContext';
// import Donations from './components/Donations';

function App() {

  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();


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
    <>
    <Welcome
     
     authUser={authUser}
    
    />

        <AuthContext.Provider value={authUser}>
          {authUser ? <Layout /> : <AuthRoutes handleLogin={handleLogin} />}
        </AuthContext.Provider>
    
    </>
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

