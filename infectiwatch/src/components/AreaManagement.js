import React, { useState, useEffect } from 'react';

const AreaManagement = () => {
    const [areas, setAreas] = useState([]);
    const [newArea, setNewArea] = useState({ name: '', description: '' });
    const [editingArea, setEditingArea] = useState(null);

    useEffect(() => {

        const sampleAreas = [
            { id: 1, name: 'Area 1', description: 'Description for Area 1' },
            { id: 2, name: 'Area 2', description: 'Description for Area 2' },
        ];
        setAreas(sampleAreas);
    }, []);

    const addArea = () => {
        setAreas([...areas, newArea]);
        setNewArea({ name: '', description: '' });
    };

    const updateArea = () => {
        const updatedAreas = areas.map((area) =>
            area.id === editingArea.id ? editingArea : area
        );
        setAreas(updatedAreas);
        setEditingArea(null);
    };

    const deleteArea = (areaToDelete) => {
        const updatedAreas = areas.filter((area) => area.id !== areaToDelete.id);
        setAreas(updatedAreas);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Area Management</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {areas.map((area) => (
                        <tr key={area.id}>
                            <td className="px-4 py-2">{area.name}</td>
                            <td className="px-4 py-2">{area.description}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => setEditingArea(area)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteArea(area)}
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
                <h2 className="text-xl font-bold mb-2">{editingArea ? 'Edit Area' : 'Add Area'}</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={editingArea ? editingArea.name : newArea.name}
                    onChange={(e) => {
                        if (editingArea) {
                            setEditingArea({ ...editingArea, name: e.target.value });
                        } else {
                            setNewArea({ ...newArea, name: e.target.value });
                        }
                    }}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={editingArea ? editingArea.description : newArea.description}
                    onChange={(e) => {
                        if (editingArea) {
                            setEditingArea({ ...editingArea, description: e.target.value });
                        } else {
                            setNewArea({ ...newArea, description: e.target.value });
                        }
                    }}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                />
                {editingArea ? (
                    <button
                        onClick={updateArea}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Update Area
                    </button>
                ) : (
                    <button
                        onClick={addArea}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Area
                    </button>
                )}
            </div>
        </div>
    );
};

export default AreaManagement;


