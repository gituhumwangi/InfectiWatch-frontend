import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto flex flex-col items-center">
                <p className="text-lg font-semibold">INFECTIWATCH</p>
                <p className="text-sm text-gray-400">00120, NAIROBI, Kenya</p>
                <p className="text-sm text-gray-400">Email: <a href="mailto:infectiwatch@gmail.com" className="text-gray-400 hover:text-white transition duration-300">Infectiwatch@gmail.com</a></p>
                <p className="text-sm text-gray-400">Phone: <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition duration-300">+123-456-7890</a></p>
                <div className="mt-4">
                    <a
                        href="https://facebook.com"
                        className="text-gray-400 hover:text-white transition duration-300 mx-2"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://twitter.com"
                        className="text-gray-400 hover:text-white transition duration-300 mx-2"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://instagram.com"
                        className="text-gray-400 hover:text-white transition duration-300 mx-2"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

