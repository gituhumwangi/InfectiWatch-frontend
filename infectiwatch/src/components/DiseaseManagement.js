import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';


const DiseaseManagement = () => {
    const [diseases, setDiseases] = useState([]);
    const [newDisease, setNewDisease] = useState({
        name: '',
        symptoms: '',
        prevention: '',
        treatment: '',
        num_of_cases: 0,
    });
    const [editingDisease, setEditingDisease] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('https://infecti-watch.onrender.com/diseases')
            .then((response) => {
                setDiseases(response.data);
            })
            .catch((error) => {
                console.error('Error fetching disease data:', error);
            });
    }, []);


    const addDisease = () => {
        axios
            .post('https://infecti-watch.onrender.com/diseases', {
                name: newDisease.name,
                symptoms: newDisease.symptoms,
                prevention: newDisease.prevention,
                treatment: newDisease.treatment,
                num_of_cases: newDisease.num_of_cases,
            })
            .then((response) => {
                if (response.status === 200) {
                    setDiseases([...diseases, response.data]);
                    setNewDisease({
                        name: '',
                        symptoms: '',
                        prevention: '',
                        treatment: '',
                        num_of_cases: 0,
                    });
                } else {
                    setError('Failed to add disease.');
                }
            })
            .catch((error) => {
                console.error('Add disease error:', error);
                setError('Failed to add disease.');
            });
    };

    const updateDisease = () => {
        axios
            .put(`https://infecti-watch.onrender.com/diseases/${editingDisease.id}`, {
                name: editingDisease.name,
                symptoms: editingDisease.symptoms,
                prevention: editingDisease.prevention,
                treatment: editingDisease.treatment,
                num_of_cases: editingDisease.num_of_cases,
            })
            .then((response) => {
                if (response.status === 200) {
                    const updatedDiseaseData = response.data;
                    const updatedDiseases = diseases.map((disease) =>
                        disease.id === updatedDiseaseData.id ? updatedDiseaseData : disease
                    );
                    setDiseases(updatedDiseases);
                    setEditingDisease(null);
                } else {
                    setError('Failed to update disease.');
                }
            })
            .catch((error) => {
                console.error('Update disease error:', error);
                setError('Failed to update disease.');
            });
    };

    const deleteDisease = (diseaseToDelete) => {
        axios
            .delete(`https://infecti-watch.onrender.com/diseases/${diseaseToDelete.id}`)
            .then((response) => {
                if (response.status === 200) {
                    const updatedDiseases = diseases.filter((disease) => disease.id !== diseaseToDelete.id);
                    setDiseases(updatedDiseases);
                } else {
                    setError('Failed to delete disease.');
                }
            })
            .catch((error) => {
                console.error('Delete disease error:', error);
                setError('Failed to delete disease.');
            });
    };

    return (

        <div className="container mx-4 my-20">
            <NavBar />
            <h1 className="text-center text-2xl font-bold mb-4">Disease Management</h1>
         
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-lightblue text-white ">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Symptoms</th>
                        <th className="px-4 py-2">Prevention</th>
                        <th className="px-4 py-2">Treatment</th>
                        <th className="px-4 py-2">Number of Cases</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {diseases.map((disease) => (
                        <tr key={disease.id} className="hover:bg-gray-300">
                            <td className="px-4 py-2">{disease.name}</td>
                            <td className="px-4 py-2">{disease.symptoms}</td>
                            <td className="px-4 py-2">{disease.prevention}</td>
                            <td className="px-4 py-2">{disease.treatment}</td>
                            <td className="px-4 py-2">{disease.num_of_cases}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => setEditingDisease(disease)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteDisease(disease)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">{editingDisease ? 'Edit Disease' : 'Add Disease'}</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={editingDisease ? editingDisease.name : newDisease.name}
                    onChange={(e) => {
                        if (editingDisease) {
                            setEditingDisease({ ...editingDisease, name: e.target.value });
                        } else {
                            setNewDisease({ ...newDisease, name: e.target.value });
                        }
                    }}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                    type="text"
                    placeholder="Symptoms"
                    value={editingDisease ? editingDisease.symptoms : newDisease.symptoms}
                    onChange={(e) => {
                        if (editingDisease) {
                            setEditingDisease({ ...editingDisease, symptoms: e.target.value });
                        } else {
                            setNewDisease({ ...newDisease, symptoms: e.target.value });
                        }
                    }}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                    type="text"
                    placeholder="Prevention"
                    value={editingDisease ? editingDisease.prevention : newDisease.prevention}
                    onChange={(e) => {
                        if (editingDisease) {
                            setEditingDisease({ ...editingDisease, prevention: e.target.value });
                        } else {
                            setNewDisease({ ...newDisease, prevention: e.target.value });
                        }
                    }}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                    type="text"
                    placeholder="Treatment"
                    value={editingDisease ? editingDisease.treatment : newDisease.treatment}
                    onChange={(e) => {
                        if (editingDisease) {
                            setEditingDisease({ ...editingDisease, treatment: e.target.value });
                        } else {
                            setNewDisease({ ...newDisease, treatment: e.target.value });
                        }
                    }}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                    type="number"
                    placeholder="Number of Cases"
                    value={editingDisease ? editingDisease.num_of_cases : newDisease.num_of_cases}
                    onChange={(e) => {
                        if (editingDisease) {
                            setEditingDisease({ ...editingDisease, num_of_cases: parseInt(e.target.value) });
                        } else {
                            setNewDisease({ ...newDisease, num_of_cases: parseInt(e.target.value) });
                        }
                    }}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                />
                <div>
                    {editingDisease ? (
                        <button
                            onClick={updateDisease}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Update Disease
                        </button>
                    ) : (
                        <button
                            onClick={addDisease}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Add Disease
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setEditingDisease(null);
                            setNewDisease({
                                name: '',
                                symptoms: '',
                                prevention: '',
                                treatment: '',
                                num_of_cases: 0,
                            });
                        }}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Clear
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default DiseaseManagement;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DiseaseManagement = () => {
//     const [diseases, setDiseases] = useState([]);
//     const [newDisease, setNewDisease] = useState({
//         name: '',
//         symptoms: '',
//         prevention: '',
//         treatment: '',
//         num_of_cases: 0,
//     });
//     const [editingDisease, setEditingDisease] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         axios
//             .get('https://infecti-watch.onrender.com/diseases')
//             .then((response) => {
//                 setDiseases(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching disease data:', error);
//             });
//     }, []);


    
//     useEffect(() => {
//         localStorage.setItem('diseases', JSON.stringify(diseases));
//     }, [diseases]);

//     const addDisease = () => {
//         axios
//             .post('https://infecti-watch.onrender.com/diseases', {
//                 name: newDisease.name,
//                 symptoms: newDisease.symptoms,
//                 prevention: newDisease.prevention,
//                 treatment: newDisease.treatment,
//                 num_of_cases: newDisease.num_of_cases,
//             })
//             .then((response) => {
//                 if (response.status === 200) {
//                     setDiseases([...diseases, response.data]);
//                     setNewDisease({
//                         name: '',
//                         symptoms: '',
//                         prevention: '',
//                         treatment: '',
//                         num_of_cases: 0,
//                     });
//                 } else {
//                     setError('Failed to add disease.');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Add disease error:', error);
//                 setError('Failed to add disease.');
//             });
//     };

//     const updateDisease = () => {
//         axios
//             .put(`https://infecti-watch.onrender.com/diseases/${editingDisease.id}`, {
//                 name: editingDisease.name,
//                 symptoms: editingDisease.symptoms,
//                 prevention: editingDisease.prevention,
//                 treatment: editingDisease.treatment,
//                 num_of_cases: editingDisease.num_of_cases,
//             })
//             .then((response) => {
//                 if (response.status === 200) {
//                     const updatedDiseaseData = response.data;
//                     const updatedDiseases = diseases.map((disease) =>
//                         disease.id === updatedDiseaseData.id ? updatedDiseaseData : disease
//                     );
//                     setDiseases(updatedDiseases);
//                     setEditingDisease(null);
//                 } else {
//                     setError('Failed to update disease.');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Update disease error:', error);
//                 setError('Failed to update disease.');
//             });
//     };

//     const deleteDisease = (diseaseToDelete) => {
//         axios
//             .delete(`https://infecti-watch.onrender.com/diseases/${diseaseToDelete.id}`)
//             .then((response) => {
//                 if (response.status === 200) {
//                     const updatedDiseases = diseases.filter((disease) => disease.id !== diseaseToDelete.id);
//                     setDiseases(updatedDiseases);
//                 } else {
//                     setError('Failed to delete disease.');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Delete disease error:', error);
//                 setError('Failed to delete disease.');
//             });
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Disease Management</h1>
//             <table className="table-auto w-full">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2">Name</th>
//                         <th className="px-4 py-2">Symptoms</th>
//                         <th className="px-4 py-2">Prevention</th>
//                         <th className="px-4 py-2">Treatment</th>
//                         <th className="px-4 py-2">Number of Cases</th>
//                         <th className="px-4 py-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {diseases.map((disease) => (
//                         <tr key={disease.id}>
//                             <td className="px-4 py-2">{disease.name}</td>
//                             <td className="px-4 py-2">{disease.symptoms}</td>
//                             <td className="px-4 py-2">{disease.prevention}</td>
//                             <td className="px-4 py-2">{disease.treatment}</td>
//                             <td className="px-4 py-2">{disease.num_of_cases}</td>
//                             <td className="px-4 py-2">
//                                 <button
//                                     onClick={() => setEditingDisease(disease)}
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => deleteDisease(disease)}
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
//                 <h2 className="text-xl font-bold mb-2">{editingDisease ? 'Edit Disease' : 'Add Disease'}</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={editingDisease ? editingDisease.name : newDisease.name}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, name: e.target.value });
//                         } else {
//                             setNewDisease({ ...newDisease, name: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Symptoms"
//                     value={editingDisease ? editingDisease.symptoms : newDisease.symptoms}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, symptoms: e.target.value });
//                         } else {
//                             setNewDisease({ ...newDisease, symptoms: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Prevention"
//                     value={editingDisease ? editingDisease.prevention : newDisease.prevention}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, prevention: e.target.value });
//                         } else {
//                             setNewDisease({ ...newDisease, prevention: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Treatment"
//                     value={editingDisease ? editingDisease.treatment : newDisease.treatment}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, treatment: e.target.value });
//                         } else {
//                             setNewDisease({ ...newDisease, treatment: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Number of Cases"
//                     value={editingDisease ? editingDisease.num_of_cases : newDisease.num_of_cases}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, num_of_cases: parseInt(e.target.value) });
//                         } else {
//                             setNewDisease({ ...newDisease, num_of_cases: parseInt(e.target.value) });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 <div>
//                     {editingDisease ? (
//                         <button
//                             onClick={updateDisease}
//                             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//                         >
//                             Update Disease
//                         </button>
//                     ) : (
//                         <button
//                             onClick={addDisease}
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                         >
//                             Add Disease
//                         </button>
//                     )}
//                     <button
//                         onClick={() => {
//                             setEditingDisease(null);
//                             setNewDisease({
//                                 name: '',
//                                 symptoms: '',
//                                 prevention: '',
//                                 treatment: '',
//                                 num_of_cases: 0,
//                             });
//                         }}
//                         className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Clear
//                     </button>
//                 </div>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default DiseaseManagement;



// import React, { useState, useEffect } from 'react';

// const DiseaseManagement = () => {
//     const [diseases, setDiseases] = useState([]);
//     const [newDisease, setNewDisease] = useState({
//         name: '',
//         description: '',
//         symptoms: '',
//         prevention: '',
//         treatment: '',
//         num_of_cases: 0,
//     });
//     const [editingDisease, setEditingDisease] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://infecti-watch.onrender.com/diseases', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': 'Bearer yourAccessToken',
//                         'Accept': 'application/json',
//                     },
//                 });

//                 if (response.ok) {
//                     const fetchedDiseases = await response.json();
//                     setDiseases(fetchedDiseases);
//                 } else {
//                     setError('Failed to fetch diseases');
//                 }
//             } catch (error) {
//                 setError('Error during fetch request: ' + error.message);
//             }
//         };

//         // Call the fetchData function
//         fetchData();
//     }, []);

//     const addDisease = async () => {
//         try {
//             const response = await fetch('https://infecti-watch.onrender.com/diseases', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': 'Bearer yourAccessToken',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newDisease),
//             });

//             if (response.ok) {
//                 const createdDisease = await response.json();
//                 setDiseases([...diseases, createdDisease]);
//                 setNewDisease({
//                     name: '',
//                     description: '',
//                     symptoms: '',
//                     prevention: '',
//                     treatment: '',
//                     num_of_cases: 0,
//                 });
//             } else {
//                 setError('Failed to add disease');
//             }
//         } catch (error) {
//             setError('Error during add request: ' + error.message);
//         }
//     };

//     const updateDisease = async () => {
//         try {
//             const response = await fetch(`https://infecti-watch.onrender.com/diseases/${editingDisease.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Authorization': 'Bearer yourAccessToken',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(editingDisease),
//             });

//             if (response.ok) {
//                 const updatedDiseases = diseases.map((disease) =>
//                     disease.id === editingDisease.id ? editingDisease : disease
//                 );
//                 setDiseases(updatedDiseases);
//                 setEditingDisease(null);
//             } else {
//                 setError('Failed to update disease');
//             }
//         } catch (error) {
//             setError('Error during update request: ' + error.message);
//         }
//     };

//     const deleteDisease = async (diseaseToDelete) => {
//         try {
//             const response = await fetch(`https://infecti-watch.onrender.com/diseases/${diseaseToDelete.id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': 'Bearer yourAccessToken',
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.ok) {
//                 const updatedDiseases = diseases.filter((disease) => disease.id !== diseaseToDelete.id);
//                 setDiseases(updatedDiseases);
//             } else {
//                 setError('Failed to delete disease');
//             }
//         } catch (error) {
//             setError('Error during delete request: ' + error.message);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Disease Management</h1>
//             {error && <div className="text-red-500 mb-4">{error}</div>}
//             <table className="table-auto w-full">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2">Name</th>
//                         <th className="px-4 py-2">Description</th>
//                         <th className="px-4 py-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {diseases.map((disease) => (
//                         <tr key={disease.id}>
//                             <td className="px-4 py-2">{disease.name}</td>
//                             <td className="px-4 py-2">{disease.description}</td>
//                             <td className="px-4 py-2">
//                                 <button
//                                     onClick={() => setEditingDisease(disease)}
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => deleteDisease(disease)}
//                                     className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="mt-4">
//                 <h2 className="text-xl font-bold mb-2">{editingDisease ? 'Edit Disease' : 'Add Disease'}</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={editingDisease ? editingDisease.name : newDisease.name}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, name: e.target.value });
//                         } else {
//                             setNewDisease({ ...newDisease, name: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={editingDisease ? editingDisease.description : newDisease.description}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, description: e.target.value });
//                         } else {
//                             setNewDisease({ ...newDisease, description: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 {/* Additional input fields for symptoms, prevention, treatment, num_of_cases */}
//                 <button
//                     onClick={editingDisease ? updateDisease : addDisease}
//                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//                 >
//                     {editingDisease ? 'Update Disease' : 'Add Disease'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DiseaseManagement;


// import React, { useState, useEffect } from 'react';

// const DiseaseManagement = () => {
//     const [diseases, setDiseases] = useState([]);
//     const [newDisease, setNewDisease] = useState({ name: '', description: '' });
//     const [editingDisease, setEditingDisease] = useState(null);

//     useEffect(() => {
//         // Simulate fetching diseases from an API (replace with actual API call)
//         const sampleDiseases = [
//             { id: 1, name: 'Disease 1', description: 'Description for Disease 1' },
//             { id: 2, name: 'Disease 2', description: 'Description for Disease 2' },
//         ];
//         setDiseases(sampleDiseases);
//     }, []);

//     const addDisease = () => {
//         setDiseases([...diseases, newDisease]);
//         setNewDisease({ name: '', description: '' });
//     };

//     const updateDisease = () => {
//         const updatedDiseases = diseases.map((disease) =>
//             disease.id === editingDisease.id ? editingDisease : disease
//         );
//         setDiseases(updatedDiseases);
//         setEditingDisease(null);
//     };

//     const deleteDisease = (diseaseToDelete) => {
//         const updatedDiseases = diseases.filter((disease) => disease.id !== diseaseToDelete.id);
//         setDiseases(updatedDiseases);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Disease Management</h1>
//             <table className="table-auto w-full">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2">Name</th>
//                         <th className="px-4 py-2">Description</th>
//                         <th className="px-4 py-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {diseases.map((disease) => (
//                         <tr key={disease.id}>
//                             <td className="px-4 py-2">{disease.name}</td>
//                             <td className="px-4 py-2">{disease.description}</td>
//                             <td className="px-4 py-2">
//                                 <button
//                                     onClick={() => setEditingDisease(disease)}
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => deleteDisease(disease)}
//                                     className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="mt-4">
//                 <h2 className="text-xl font-bold mb-2">{editingDisease ? 'Edit Disease' : 'Add Disease'}</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={editingDisease ? editingDisease.name : newDisease.name}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, name: e.target.value });
//                         } else {
//                             setNewDisease({ ...newDisease, name: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={editingDisease ? editingDisease.description : newDisease.description}
//                     onChange={(e) => {
//                         if (editingDisease) {
//                             setEditingDisease({ ...editingDisease, description: e.target.value });
//                         } else {
//                             setNewDisease({ ...newDisease, description: e.target.value });
//                         }
//                     }}
//                     className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
//                 />
//                 {editingDisease ? (
//                     <button
//                         onClick={updateDisease}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//                     >
//                         Update Disease
//                     </button>
//                 ) : (
//                     <button
//                         onClick={addDisease}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Add Disease
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DiseaseManagement;
