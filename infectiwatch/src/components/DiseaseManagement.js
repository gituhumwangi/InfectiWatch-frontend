import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

const DiseaseManagement = () => {
    const [diseases, setDiseases] = useState([]);
    const [newDisease, setNewDisease] = useState({ name: '', description: '' });
    const [editingDisease, setEditingDisease] = useState(null);

    useEffect(() => {
        // Simulate fetching diseases from an API (replace with actual API call)
        const sampleDiseases = [
            { id: 1, name: 'Disease 1', description: 'Description for Disease 1' },
            { id: 2, name: 'Disease 2', description: 'Description for Disease 2' },
        ];
        setDiseases(sampleDiseases);
    }, []);

    const addDisease = () => {
        setDiseases([...diseases, newDisease]);
        setNewDisease({ name: '', description: '' });
    };

    const updateDisease = () => {
        const updatedDiseases = diseases.map((disease) =>
            disease.id === editingDisease.id ? editingDisease : disease
        );
        setDiseases(updatedDiseases);
        setEditingDisease(null);
    };

    const deleteDisease = (diseaseToDelete) => {
        const updatedDiseases = diseases.filter((disease) => disease.id !== diseaseToDelete.id);
        setDiseases(updatedDiseases);
    };

    return (
        <div className="container mx-auto p-4">
            <NavBar />
            <h1 className="text-2xl font-bold mb-4">Disease Management</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {diseases.map((disease) => (
                        <tr key={disease.id}>
                            <td className="px-4 py-2">{disease.name}</td>
                            <td className="px-4 py-2">{disease.description}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => setEditingDisease(disease)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteDisease(disease)}
                                    className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded"
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
                    placeholder="Description"
                    value={editingDisease ? editingDisease.description : newDisease.description}
                    onChange={(e) => {
                        if (editingDisease) {
                            setEditingDisease({ ...editingDisease, description: e.target.value });
                        } else {
                            setNewDisease({ ...newDisease, description: e.target.value });
                        }
                    }}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                />
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Disease
                    </button>
                )}
            </div>
        </div>
    );
};

export default DiseaseManagement;
