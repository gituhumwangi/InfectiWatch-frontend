
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-white text-2xl font-bold">
                    INFECTIWATCH
                </Link>
                <ul className="flex space-x-7">
                  
                    <li>
                        <Link
                            to="/diseases"
                            className="text-white hover:text-gray-300 transition duration-300"
                        >
                            Diseases
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/location"
                            className="text-white hover:text-gray-300 transition duration-300"
                        >
                            Location
                        </Link>
                    </li>
                    
                    

                    <li>
                        <Link
                            to="/reviews"
                            className="text-white hover:text-gray-300 transition duration-300"
                        >
                            Reviews
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="text-white hover:text-gray-300 transition duration-300"
                        >
                            Log out
                        </Link>
                        <li/>
                    </li>
                   
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
