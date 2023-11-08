import React, { useState } from 'react';
import UserManagement from './UserManagement';
import DiseaseManagement from './DiseaseManagement';
import AreaManagement from './AreaManagement';

const Admin = () => {
    const [view, setView] = useState('user');

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <form className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
            <div className="flex space-x-4 mb-4">
                <button
                    type="button"
                    onClick={() => handleViewChange('user')}
                    className={`${view === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        } hover:bg-blue-700 py-2 px-4 rounded`}
                >
                    User Management
                </button>
                <button
                    type="button"
                    onClick={() => handleViewChange('disease')}
                    className={`${view === 'disease' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        } hover-bg-blue-700 py-2 px-4 rounded`}
                >
                    Disease Management
                </button>
                <button
                    type="button"
                    onClick={() => handleViewChange('area')}
                    className={`${view === 'area' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        } hover:bg-blue-700 py-2 px-4 rounded`}
                >
                    Area Management
                </button>
            </div>
            {view === 'user' && <UserManagement />}
            {view === 'disease' && <DiseaseManagement />}
            {view === 'area' && <AreaManagement />}
        </form>
    );
};

export default Admin;


// import React, { useState } from 'react';
// import UserManagement from './UserManagement';
// import DiseaseManagement from './DiseaseManagement';
// import AreaManagement from './AreaManagement';

// const Admin = () => {
//     const [view, setView] = useState('user'); // Use state to manage which section to display

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
//             <div className="flex space-x-4 mb-4">
//                 <button
//                     className={`${view === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//                         } hover:bg-blue-700 py-2 px-4 rounded`}
//                     onClick={() => setView('user')}
//                 >
//                     User Management
//                 </button>
//                 <button
//                     className={`${view === 'disease' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//                         } hover:bg-blue-700 py-2 px-4 rounded`}
//                     onClick={() => setView('disease')}
//                 >
//                     Disease Management
//                 </button>
//                 <button
//                     className={`${view === 'area' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//                         } hover:bg-blue-700 py-2 px-4 rounded`}
//                     onClick={() => setView('area')}
//                 >
//                     Area Management
//                 </button>
//             </div>
//             {view === 'user' && <UserManagement />}
//             {view === 'disease' && <DiseaseManagement />}
//             {view === 'area' && <AreaManagement />}
//         </div>
//     );
// };

// export default Admin;


