import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {
        setError(''); // Clear any previous error messages

        if (!userName || !email || !password) {
            setError('Please fill in all required fields.');
            return;
        }

        axios
            .post('http://127.0.0.1:5000/users', {
                userName,
                email,
                password,
            })
            .then((response) => {
                console.log('Signup successful');
                // Handle successful signup, e.g., redirect to login page.
            })
            .catch((error) => {
                console.error('Signup error:', error);
                setError('Signup failed. Please try again.');
            });
    };

    const containerStyle = {
        backgroundImage: `url('https://media.istockphoto.com/id/1446229465/photo/red-heart-and-stethoscope-are-on-blue-background.webp?b=1&s=170667a&w=0&k=20&c=1-aE7XV24f8qVr8fGnpvypir8fSxYaM9sHZurKoutj8=')`,
        backgroundSize: 'cover',
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-screen"
            style={containerStyle}
        >
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <div className="input-container mb-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="input-container mb-4">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="input-container mb-4">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSignup}
            >
                Signup
            </button>
            <p className="mt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500">Login</Link>
            </p>
        </div>
    );
};

export default Signup;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//     const [userName, setUserName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSignup = () => {
//         setError(''); // Clear any previous error messages

//         if (!userName || !email || !password) {
//             setError('Please fill in all required fields.');
//             return;
//         }

//         axios
//             .post('http://127.0.0.1:5000/users', {
//                 userName,
//                 email,
//                 password,
//             })
//             .then((response) => {
//                 console.log('Signup successful');
//                 // Handle successful signup, e.g., redirect to login page.
//             })
//             .catch((error) => {
//                 console.error('Signup error:', error);
//                 setError('Signup failed. Please try again.');
//             });
//     };


//     const containerStyle = {
//         backgroundImage: 'url("https://media.istockphoto.com/id/1446229465/photo/red-heart-and-stethoscope-are-on-blue-background.webp?b=1&s=170667a&w=0&k=20&c=1-aE7XV24f8qVr8fGnpvypir8fSxYaM9sHZurKoutj8=")',
//         backgroundSize: 'cover',
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <h2 className="text-2xl font-bold mb-4">Signup</h2>
//             <div className="input-container mb-4">
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
//                 />
//             </div>
//             <div className="input-container mb-4">
//                 <input
//                     type="text"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
//                 />
//             </div>
//             <div className="input-container mb-4">
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
//                 />
//             </div>
//             {error && <p className="text-red-500">{error}</p>}
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleSignup}
//             >
//                 Signup
//             </button>
//             <p className="mt-2">
//                 Already have an account?{' '}
//                 <Link to="/login" className="text-blue-500">Login</Link>
//             </p>
//         </div>
//     );
// };

// export default Signup;


// import React, { useState } from 'react'; // Import useState
// import axios from 'axios'; // Import axios
// import { Link } from 'react-router-dom'; // Import Link

// const Signup = () => {
//     const [userName, setUserName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSignup = () => {
//         setError(''); // Clear any previous error messages

//         if (!userName || !email || !password) {
//             setError('Please fill in all required fields.');
//             return;
//         }

//         axios
//             .post('http://127.0.0.1:5000/signup', {
//                 userName,
//                 email,
//                 password,
//             })
//             .then((response) => {
//                 console.log('Signup successful');

//             })
//             .catch((error) => {
//                 console.error('Signup error:', error);
//                 setError('Signup failed. Please try again.');
//             });
//     };

//     return (
//         <div className="container">
//             <h2>Signup</h2>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className="input-container">
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </div>
//             {error && <p className="error-message">{error}</p>}
//             <button className="signup-button" onClick={handleSignup}>
//                 Signup
//             </button>
//             <p>
//                 Already have an account?{' '}
//                 <Link to="/login">Login</Link>
//             </p>
//         </div>
//     );
// };

// export default Signup;