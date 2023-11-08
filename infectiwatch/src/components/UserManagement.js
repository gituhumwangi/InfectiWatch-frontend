import React, { useState, useEffect } from 'react';
import axios from 'axios'

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user' });
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState('');


    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/users')
            .then((response) => {
                setUsers(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [])

    const addUser = () => {
        axios
            .post('http://127.0.0.1:5000/users', {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                password_hash: newUser.password_hash,
            })
            .then((response) => {
                if (response.status === 200) {
                    setUsers([...users, response.data]);
                    setNewUser({ username: '', email: '', role: 'user', password_hash: '' });
                } else {
                    setError('Failed to add user.');
                }
            })
            .catch((error) => {
                console.error('Add user error:', error);
                setError('Failed to add user.');
            });
    };


    const updateUser = () => {
        axios
            .put(`http://127.0.0.1:5000/users/${editingUser.id}`, {
                username: editingUser.username,
                email: editingUser.email,
                role: editingUser.role,
            })
            .then((response) => {
                if (response.status === 200) {
                    const updatedUserData = response.data;
                    const updatedUsers = users.map((user) =>
                        user.id === updatedUserData.id ? updatedUserData : user
                    );
                    setUsers(updatedUsers);
                    setEditingUser(null);
                } else {
                    setError('Failed to update user.');
                }
            })
            .catch((error) => {
                console.error('Update user error:', error);
                setError('Failed to update user.');
            });
    };


    const deleteUser = (userToDelete) => {
        axios
            .delete(`http://127.0.0.1:5000/users/${userToDelete.id}`)
            .then((response) => {
                if (response.status === 200) {
                    const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
                    setUsers(updatedUsers);
                } else {
                    setError('Failed to delete user.');
                }
            })
            .catch((error) => {
                console.error('Delete user error:', error);
                setError('Failed to delete user.');
            });
    };


        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-4 py-2">{user.username}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user)}
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
                    <h2 className="text-xl font-bold mb-2">{editingUser ? 'Edit User' : 'Add User'}</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={editingUser ? editingUser.username : newUser.username}
                        onChange={(e) => {
                            if (editingUser) {
                                setEditingUser({ ...editingUser, username: e.target.value });
                            } else {
                                setNewUser({ ...newUser, username: e.target.value });
                            }
                        }}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={editingUser ? editingUser.email : newUser.email}
                        onChange={(e) => {
                            if (editingUser) {
                                setEditingUser({ ...editingUser, email: e.target.value });
                            } else {
                                setNewUser({ ...newUser, email: e.target.value });
                            }
                        }}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                    />
                    <select
                        value={editingUser ? editingUser.role : newUser.role}
                        onChange={(e) => {
                            if (editingUser) {
                                setEditingUser({ ...editingUser, role: e.target.value });
                            } else {
                                setNewUser({ ...newUser, role: e.target.value });
                            }
                        }}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline mb-2"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {editingUser ? (
                        <button
                            onClick={updateUser}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Update User
                        </button>
                    ) : (
                        <button
                            onClick={addUser}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add User
                        </button>
                    )}
                </div>
            </div>
        );
    };

export default UserManagement;



// import React, { useState, useEffect } from 'react';

// const UserManagement = () => {
//     const [users, setUsers] = useState([]);
//     const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user' });
//     const [editingUser, setEditingUser] = useState(null);

//     useEffect(() => {
//         fetch('/api/users') // Replace '/api/users' with the actual API endpoint
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setUsers(data); // Update the users state with the fetched data
//             })
//             .catch((error) => {
//                 console.error('Error fetching user data:', error);
//             });
    
//         const sampleUsers = [
//             { id: 1, username: 'user1', email: 'user1@example.com', role: 'user' },
//             { id: 2, username: 'user2', email: 'user2@example.com', role: 'admin' },
//         ];
//         setUsers(sampleUsers);
//     }, []);

//     const addUser = () => {
//         setUsers([...users, newUser]);
//         setNewUser({ username: '', email: '', role: 'user' });
//     };

//     const updateUser = () => {
//         const updatedUsers = users.map((user) => (user.id === editingUser.id ? editingUser : user));
//         setUsers(updatedUsers);
//         setEditingUser(null);
//     };

//     const deleteUser = (userToDelete) => {
//         const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
//         setUsers(updatedUsers);
//     };

//     return (
//         <div>
//             <h1>User Management</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Username</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user.id}>
//                             <td>{user.username}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                             <td>
//                                 <button onClick={() => setEditingUser(user)}>Edit</button>
//                                 <button onClick={() => deleteUser(user)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div>
//                 <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={editingUser ? editingUser.username : newUser.username}
//                     onChange={(e) => {
//                         if (editingUser) {
//                             setEditingUser({ ...editingUser, username: e.target.value });
//                         } else {
//                             setNewUser({ ...newUser, username: e.target.value });
//                         }
//                     }}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Email"
//                     value={editingUser ? editingUser.email : newUser.email}
//                     onChange={(e) => {
//                         if (editingUser) {
//                             setEditingUser({ ...editingUser, email: e.target.value });
//                         } else {
//                             setNewUser({ ...newUser, email: e.target.value });
//                         }
//                     }}
//                 />
//                 <select
//                     value={editingUser ? editingUser.role : newUser.role}
//                     onChange={(e) => {
//                         if (editingUser) {
//                             setEditingUser({ ...editingUser, role: e.target.value });
//                         } else {
//                             setNewUser({ ...newUser, role: e.target.value });
//                         }
//                     }}
//                 >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                 </select>
//                 {editingUser ? (
//                     <button onClick={updateUser}>Update User</button>
//                 ) : (
//                     <button onClick={addUser}>Add User</button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserManagement;
