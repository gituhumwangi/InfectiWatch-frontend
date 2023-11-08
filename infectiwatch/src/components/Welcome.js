import React from 'react';
import { Link } from 'react-router-dom';


const Welcome = () => {
    return (
        <div
            style={{
                backgroundImage: 'url("https://media1.giphy.com/media/xUA7biF7n8LcAqh4bK/giphy.gif?cid=6c09b952k0mwn74aa6ek8vbpyeem1pr77nm50hvdew98awaj&ep=v1_gifs_search&rid=giphy.gif&ct=g")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className="flex flex-col items-center justify-center h-screen"
        >
            <span className="text-4xl text-center text-gray-900">
                Welcome to <span className="text-style-1 text-red-500">INFECTI</span>WATCH
            </span>


            <div class= 'container'></div>

            <div className="mt-4 space-x-4">
                <Link to="/login">
                    <button className="bg-blue-500 hover.bg-blue-700 text-white font.bold py-2 px-4 rounded">
                        Log In
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="bg-green-500 hover.bg-green-700 text-white font.bold py-2 px-4 rounded">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    );
};


export default Welcome;


