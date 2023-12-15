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
            .get('http://127.0.0.1:5000/diseases')
            .then((response) => {
                setDiseases(response.data);
            })
            .catch((error) => {
                console.error('Error fetching disease data:', error);
            });
    }, []);


    const addDisease = () => {
        axios
            .post('http://127.0.0.1:5000/diseases', {
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
            .put(`http://127.0.0.1:5000/diseases/${editingDisease.id}`, {
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
            .delete(`http://127.0.0.1:5000/diseases/${diseaseToDelete.id}`)
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


