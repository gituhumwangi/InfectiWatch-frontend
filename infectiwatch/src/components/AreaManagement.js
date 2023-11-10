import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

import axios from 'axios';


const AreaManagement = () => {
    const [areas, setAreas] = useState([]);
    const [newArea, setNewArea] = useState({
        name: '',
        coordinates: '',
        population: 0,
        more_details: '',
    });
    const [updatedArea, setUpdatedArea] = useState({
        id: 0,
        name: '',
        coordinates: '',
        population: 0,
        more_details: '',
    });

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/location');
                setAreas(response.data);
            } catch (error) {
                console.error('Error fetching areas:', error);
            }
        };

        fetchAreas();
    }, []);

    const handleAddArea = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/location',
                newArea
            );
            console.log('Area added successfully:', response.data);
            
            const refreshedAreas = await axios.get('http://127.0.0.1:5000/location');
            setAreas(refreshedAreas.data);
            
            setNewArea({
                name: '',
                coordinates: '',
                population: 0,
                more_details: '',
            });
        } catch (error) {
            console.error('Error adding area:', error);
        }
    };

    const handleUpdateArea = async () => {
        try {
            const response = await axios.patch(
                `https://infecti-watch.onrender.com/location/${updatedArea.id}`,
                updatedArea
            );
            console.log('Area updated successfully:', response.data);
            // Refresh the areas list after updating
            const refreshedAreas = await axios.get('https://infecti-watch.onrender.com/location');
            setAreas(refreshedAreas.data);
            // Clear the form
            setUpdatedArea({
                id: 0,
                name: '',
                coordinates: '',
                population: 0,
                more_details: '',
            });
        } catch (error) {
            console.error('Error updating area:', error);
        }
    };

    const handleInputChange = (e, target) => {
        if (target === 'newArea') {
            setNewArea({
                ...newArea,
                [e.target.name]: e.target.value,
            });
        } else if (target === 'updatedArea') {
            setUpdatedArea({
                ...updatedArea,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSelectArea = (selectedArea) => {
        setUpdatedArea(selectedArea);
    };

    return (

        <div className="diseases-container mx-4 my-20">
            <NavBar />
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
                                <button
                                    onClick={() => handleSelectArea(area)}
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    Select Area
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1 className="text-center text-2xl font-bold p-4 bg-blue-500 text-white shadow mt-8">
                Add New Area
            </h1>
            <form className="mt-4">
                <label className="block">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newArea.name}
                        onChange={(e) => handleInputChange(e, 'newArea')}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <br />
                <label className="block">
                    Coordinates:
                    <input
                        type="text"
                        name="coordinates"
                        value={newArea.coordinates}
                        onChange={(e) => handleInputChange(e, 'newArea')}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <br />
                <label className="block">
                    Population:
                    <input
                        type="number"
                        name="population"
                        value={newArea.population}
                        onChange={(e) => handleInputChange(e, 'newArea')}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <br />
                <label className="block">
                    More Details:
                    <input
                        type="text"
                        name="more_details"
                        value={newArea.more_details}
                        onChange={(e) => handleInputChange(e, 'newArea')}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <br />
                <button
                    type="button"
                    onClick={handleAddArea}
                    className="bg-blue-500 text-white p-2 rounded mt-2"
                >
                    Add Area
                </button>
            </form>

            <h1 className="text-center text-2xl font-bold p-4 bg-blue-500 text-white shadow mt-8">
                Update Area
            </h1>
            <form className="mt-4">
                <label className="block">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={updatedArea.name}
                        onChange={(e) => handleInputChange(e, 'updatedArea')}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <br />
                <label className="block">
                    Coordinates:
                    <input
                        type="text"
                        name="coordinates"
                        value={updatedArea.coordinates}
                        onChange={(e) => handleInputChange(e, 'updatedArea')}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <br />
                <label className="block">
                    Population:
                    <input
                        type="number"
                        name="population"
                        value={updatedArea.population}
                        onChange={(e) => handleInputChange(e, 'updatedArea')}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <br />
                <label className="block">
                    More Details:
                    <input
                        type="text"
                        name="more_details"
                        value={updatedArea.more_details}
                        onChange={(e) => handleInputChange(e, 'updatedArea')}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <br />
                <button
                    type="button"
                    onClick={handleUpdateArea}
                    className="bg-blue-500 text-white p-2 rounded mt-2"
                >
                    Update Area
                </button>
            </form>
        </div>
    );
};

export default AreaManagement;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AreaManagement = () => {
//     const [areas, setAreas] = useState([]);
//     const [newArea, setNewArea] = useState({
//         name: '',
//         coordinates: '',
//         population: 0,
//         more_details: '',
//     });
//     const [updatedArea, setUpdatedArea] = useState({
//         id: 0,
//         name: '',
//         coordinates: '',
//         population: 0,
//         more_details: '',
//     });

//     useEffect(() => {
//         const fetchAreas = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:5000/location');
//                 setAreas(response.data);
//             } catch (error) {
//                 console.error('Error fetching areas:', error);
//             }
//         };

//         fetchAreas();
//     }, []);

//     const handleAddArea = async () => {
//         try {
//             const response = await axios.post(
//                 'http://127.0.0.1:5000/location',
//                 newArea
//             );
//             console.log('Area added successfully:', response.data);
//             // Refresh the areas list after adding
//             const refreshedAreas = await axios.get('http://127.0.0.1:5000/location');
//             setAreas(refreshedAreas.data);
//             // Clear the form
//             setNewArea({
//                 name: '',
//                 coordinates: '',
//                 population: 0,
//                 more_details: '',
//             });
//         } catch (error) {
//             console.error('Error adding area:', error);
//         }
//     };

//     const handleUpdateArea = async () => {
//         try {
//             const response = await axios.patch(
//                 `http://127.0.0.1:5000/location/${updatedArea.id}`,
//                 updatedArea
//             );
//             console.log('Area updated successfully:', response.data);
//             // Refresh the areas list after updating
//             const refreshedAreas = await axios.get('http://127.0.0.1:5000/location');
//             setAreas(refreshedAreas.data);
//             // Clear the form
//             setUpdatedArea({
//                 id: 0,
//                 name: '',
//                 coordinates: '',
//                 population: 0,
//                 more_details: '',
//             });
//         } catch (error) {
//             console.error('Error updating area:', error);
//         }
//     };

//     const handleInputChange = (e, target) => {
//         if (target === 'newArea') {
//             setNewArea({
//                 ...newArea,
//                 [e.target.name]: e.target.value,
//             });
//         } else if (target === 'updatedArea') {
//             setUpdatedArea({
//                 ...updatedArea,
//                 [e.target.name]: e.target.value,
//             });
//         }
//     };

//     const handleSelectArea = (selectedArea) => {
//         setUpdatedArea(selectedArea);
//     };

//     return (
//         <div>
//             <h2>Area List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Coordinates</th>
//                         <th>Population</th>
//                         <th>More Details</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {areas.map((area) => (
//                         <tr key={area.id}>
//                             <td>{area.id}</td>
//                             <td>{area.name}</td>
//                             <td>{area.coordinates}</td>
//                             <td>{area.population}</td>
//                             <td>{area.more_details}</td>
//                             <td>
//                                 <button onClick={() => handleSelectArea(area)}>
//                                     Select Area
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <h2>Add New Area</h2>
//             <form>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         name="name"
//                         value={newArea.name}
//                         onChange={(e) => handleInputChange(e, 'newArea')}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Coordinates:
//                     <input
//                         type="text"
//                         name="coordinates"
//                         value={newArea.coordinates}
//                         onChange={(e) => handleInputChange(e, 'newArea')}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Population:
//                     <input
//                         type="number"
//                         name="population"
//                         value={newArea.population}
//                         onChange={(e) => handleInputChange(e, 'newArea')}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     More Details:
//                     <input
//                         type="text"
//                         name="more_details"
//                         value={newArea.more_details}
//                         onChange={(e) => handleInputChange(e, 'newArea')}
//                     />
//                 </label>
//                 <br />
//                 <button type="button" onClick={handleAddArea}>
//                     Add Area
//                 </button>
//             </form>

//             <h2>Update Area</h2>
//             <form>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         name="name"
//                         value={updatedArea.name}
//                         onChange={(e) => handleInputChange(e, 'updatedArea')}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Coordinates:
//                     <input
//                         type="text"
//                         name="coordinates"
//                         value={updatedArea.coordinates}
//                         onChange={(e) => handleInputChange(e, 'updatedArea')}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Population:
//                     <input
//                         type="number"
//                         name="population"
//                         value={updatedArea.population}
//                         onChange={(e) => handleInputChange(e, 'updatedArea')}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     More Details:
//                     <input
//                         type="text"
//                         name="more_details"
//                         value={updatedArea.more_details}
//                         onChange={(e) => handleInputChange(e, 'updatedArea')}
//                     />
//                 </label>
//                 <br />
//                 <button type="button" onClick={handleUpdateArea}>
//                     Update Area
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AreaManagement;


// import React, { useState, useEffect } from 'react';

// const AreaManagement = () => {
//     const [areas, setAreas] = useState([]);
//     const [newArea, setNewArea] = useState({ name: '', description: '' });
//     const [editingArea, setEditingArea] = useState(null);

//     useEffect(() => {

//         const sampleAreas = [
//             { id: 1, name: 'Area 1', description: 'Description for Area 1' },
//             { id: 2, name: 'Area 2', description: 'Description for Area 2' },
//         ];
//         setAreas(sampleAreas);
//     }, []);

//     const addArea = () => {
//         setAreas([...areas, newArea]);
//         setNewArea({ name: '', description: '' });
//     };

//     const updateArea = () => {
//         const updatedAreas = areas.map((area) =>
//             area.id === editingArea.id ? editingArea : area
//         );
//         setAreas(updatedAreas);
//         setEditingArea(null);
//     };

//     const deleteArea = (areaToDelete) => {
//         const updatedAreas = areas.filter((area) => area.id !== areaToDelete.id);
//         setAreas(updatedAreas);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Area Management</h1>
//             <table className="table-auto w-full">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2">Name</th>
//                         <th className="px-4 py-2">Description</th>
//                         <th className="px-4 py-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {areas.map((area) => (
//                         <tr key={area.id}>
//                             <td className="px-4 py-2">{area.name}</td>
//                             <td className="px-4 py-2">{area.description}</td>
//                             <td className="px-4 py-2">
//                                 <button
//                                     onClick={() => setEditingArea(area)}
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => deleteArea(area)}
//                                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="mt-4">
//                 <h2 className="text-xl font-bold mb-2">{editingArea ? 'Edit Area' : 'Add Area'}</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={editingArea ? editingArea.name : newArea.name}
//                     onChange={(e) => {
//                         if (editingArea) {
//                             setEditingArea({ ...editingArea, name: e.target.value });
//                         } else {
//                             setNewArea({ ...newArea, name: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={editingArea ? editingArea.description : newArea.description}
//                     onChange={(e) => {
//                         if (editingArea) {
//                             setEditingArea({ ...editingArea, description: e.target.value });
//                         } else {
//                             setNewArea({ ...newArea, description: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 {editingArea ? (
//                     <button
//                         onClick={updateArea}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//                     >
//                         Update Area
//                     </button>
//                 ) : (
//                     <button
//                         onClick={addArea}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Add Area
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AreaManagement;


