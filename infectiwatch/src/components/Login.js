
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import customHistory from './useCustomHistory'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password_hash, setPasswordHash] = useState('');
    const [role, setRole] = useState('User');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate()
    const handleLogin = () => {
        setError('');
        setSuccess('');

        axios
            .post('https://infecti-watch.onrender.com/login', {
                username,
                password_hash,
                role,
            })
            .then((response) => {
                const accessToken = response.data.access_token;
                console.log('Login successful', accessToken);
                setSuccess('Login successful');
                if (response.status === 200) {
                    setSuccess('Login successful');
                    localStorage.setItem('accessToken', response.data.access_token);
                    navigate("/admin")
                    // customHistory.push('/admin');

                } else {
                    setError('Login failed. Please check your credentials.');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                setError('Login failed. Please check your credentials.');
            });
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-cover"
            style={{
                backgroundImage: `url('https://media.istockphoto.com/id/1446229465/photo/red-heart-and-stethoscope-are-on-blue-background.webp?b=1&s=170667a&w=0&k=20&c=1-aE7XV24f8qVr8fGnpvypir8fSxYaM9sHZurKoutj8=')`,
            }}
        >
            <div className="input-container mb-4">
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <h1 className="text-4xl font-semibold mb-4 text-white">Welcome back to Infectiwatch!</h1>
            <h2 className="text-2xl font mb-4 text-white">Please enter your details</h2>
            <div className="input-container mb-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="input-container mb-4">
                <input
                    type="password"
                    placeholder="Password"
                    value={password_hash}
                    onChange={(e) => setPasswordHash(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <button
                className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin}
            >
                Log In
            </button>
            <p className="mt-2 text-white">
                Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
            </p>
        </div>
    );
};

export default Login;

