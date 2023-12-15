
import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { getSendingDataSpinner } from '../utils/functions';
// import customHistory from './useCustomHistory'; 

const Login = ({ handleLogin }) => {
    const formSchema = yup.object().shape({
      username: yup.string().email("Invalid email").required("Must enter email"),
      password: yup.string().required("Must enter a password"),
    });
  
    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
        handleLogin(values, formik.setSubmitting);
      },
    });


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover"
            style={{
                 backgroundImage: `url('https://media.istockphoto.com/id/1446229465/photo/red-heart-and-stethoscope-are-on-blue-background.webp?b=1&s=170667a&w=0&k=20&c=1-aE7XV24f8qVr8fGnpvypir8fSxYaM9sHZurKoutj8=')`,
        }}>
          <div className="login-card">
          <h1 className="text-4xl font-semibold mb-4 text-white">Welcome back to Infectiwatch!</h1>
            <h2 className="text-2xl font mb-4 text-white">Please enter your details</h2>
            <form className="input-container mb-4" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="form-control">
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Type your username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </div>
                <p className="error">{formik.errors.username}</p>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="form-control">
                  <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Type your password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
                <p className="error">{formik.errors.password}</p>
              </div>
              <div className="form-group">
                {formik.isSubmitting ? (
                  <div className="spinner-loader">{getSendingDataSpinner()}</div>
                ) : (
                  <input type="submit" value="LOGIN" />
                )}
              </div>
            </form>
            <div className="or-link">
              {/* You don't have an account <Link to="/signup">Signup</Link> */}
            </div>
          </div>
        </div>
      );
    };

//     return (
//         <div
//             className="flex flex-col items-center justify-center h-screen bg-cover"
//             style={{
//                 backgroundImage: `url('https://media.istockphoto.com/id/1446229465/photo/red-heart-and-stethoscope-are-on-blue-background.webp?b=1&s=170667a&w=0&k=20&c=1-aE7XV24f8qVr8fGnpvypir8fSxYaM9sHZurKoutj8=')`,
//             }}
//         >
//             

//             <h1 className="text-4xl font-semibold mb-4 text-white">Welcome back to Infectiwatch!</h1>
//             <h2 className="text-2xl font mb-4 text-white">Please enter your details</h2>
//             <div className="input-container mb-4">
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
//                 />
//             </div>
//             <div className="input-container mb-4">
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password_hash}
//                     onChange={(e) => setPasswordHash(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
//                 />
//             </div>
//             {error && <p className="text-red-500">{error}</p>}
//             {success && <p className="text-green-500">{success}</p>}
//             <button
//                 className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleLogin}
//             >
//                 Log In
//             </button>
//             <p className="mt-2 text-white">
//                 Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
//             </p>
//         </div>
//     );
// };

export default Login;