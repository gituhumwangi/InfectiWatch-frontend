// import React from "react";
// import Donations from "./Donations"
// import NavBar from "./NavBar";

// function Location () {
//     return (
//         <div>
//             <NavBar/>
//             <Donations />
//         </div>
//     )
// }

// export default Location

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Donations from "./Donations"
import NavBar from "./NavBar";

const Location = () => {
    const [areas, setAreas] = useState([]);
    
    

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000//location');
                setAreas(response.data);
            } catch (error) {
                console.error('Error fetching areas:', error);
            }
        };

        fetchAreas();
    }, []);

    return (
        <div className="diseases-container mx-4 my-20">
            <NavBar/>
            <Donations />
            <h1 className="text-center text-2xl font-bold p-4 bg-blue-500 text-white shadow">
                Area List
            </h1>
            <table className="w-full border-collapse border border-gray-400 mt-4">
                <thead>
                    <tr className="bg-lightblue text-white">
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Coordinates</th>
                        <th className="p-2">Population</th>
                        <th className="p-2">More Details</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {areas.map((area) => (
                        <tr key={area.id} className="hover:bg-gray-300">
                            <td className="p-2">{area.id}</td>
                            <td className="p-2">{area.name}</td>
                            <td className="p-2">{area.coordinates}</td>
                            <td className="p-2">{area.population}</td>
                            <td className="p-2">{area.more_details}</td>
                            <td className="p-2">
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
};

export default Location;