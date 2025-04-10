
// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Trash, ToggleOn, ToggleOff } from 'react-bootstrap-icons';
// import { Modal, Button } from 'react-bootstrap';
// import AdminFeedbackManager from '../component/admin/AdminFeedbackManager';


// function UserList() {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null); 
//     const [isLoading, setIsLoading] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false); 
//     const [userToDelete, setUserToDelete] = useState(null);
  


//     const fetchUsers = useCallback(async () => {
//         setIsLoading(true); 
//         setError(null); 
//         const token = localStorage.getItem('access_token');

        
//         if (!token) {
//             setError("Authentication required. Please log in again.");
//             setIsLoading(false);
           
//             return;
//         }

//         try {
           
//             const response = await axios.get('http://127.0.0.1:8000/api/users/', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             console.log("Fetched Users:", response.data);
//             setUsers(response.data); 
//         } catch (err) {
//             console.error("Error fetching users:", err.response || err.message);
//             if (err.response && (err.response.status === 401 || err.response.status === 403)) {
//                 setError("Session expired or invalid credentials. Please log in again.");
//             } else {
//                 setError("Failed to fetch users. Please check the server connection or try again later.");
//             }
//         } finally {
//             setIsLoading(false); 
//         }
//     }, []);
//     useEffect(() => {
//         fetchUsers();
//     }, [fetchUsers]); 


//     const handleDeleteClick = (user) => {
//         setUserToDelete(user); 
//         setShowDeleteModal(true); 
//     };

//     const confirmDelete = async () => {
//         if (!userToDelete) return; 

//         const token = localStorage.getItem('access_token');
//         if (!token) {
//             setError("Authentication required for deletion.");
//             setShowDeleteModal(false); 
//             return;
//         }

       

//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/users/${userToDelete.id}/`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
//             setShowDeleteModal(false); 
//             setUserToDelete(null); 
//             setError(null); 
           

//         } catch (err) {
//             console.error("Error deleting user:", err.response || err.message);
//             let errorMsg = `Failed to delete user ${userToDelete.username}.`;
//             if (err.response) {
//                 if (err.response.status === 401 || err.response.status === 403) {
//                     errorMsg = "Permission denied or session expired.";
//                 } else if (err.response.data && err.response.data.detail) {
//                     errorMsg = err.response.data.detail; 
//                 }
//             }
//             setError(errorMsg);
//             setShowDeleteModal(false); 
//         }
//     };


//     const toggleUserActiveStatus = async (userToToggle) => {
//         const token = localStorage.getItem('access_token');
//         if (!token) {
//             setError("Authentication required.");
//             return;
//         }

//         const newStatus = !userToToggle.is_active; 

     

//         try {
//             const response = await axios.patch(
//                 `http://127.0.0.1:8000/api/users/${userToToggle.id}/`,
//                 { is_active: newStatus },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setUsers(prevUsers =>
//                 prevUsers.map(u =>
//                     u.id === userToToggle.id ? response.data : u
//                 )
//             );
//             setError(null); 
            

//         } catch (err) {
//             console.error("Error toggling user status:", err.response?.data || err.message);
//             let errorMsg = `Failed to update status for user ${userToToggle.username}.`;
//             if (err.response) {
//                 if (err.response.status === 401 || err.response.status === 403) {
//                     errorMsg = "Permission denied or session expired.";
//                 } else if (err.response.data) {
//                     try {
//                         const errors = err.response.data;
//                         errorMsg = Object.entries(errors).map(([key, value]) =>
//                             `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
//                         ).join('; ');
//                     } catch {
//                         errorMsg = err.response.data.detail || JSON.stringify(err.response.data);
//                     }
//                 }
//             }
//             setError(errorMsg);
//         }
//     };


//     return (
//         <div className="card shadow-sm mb-4"> 
//             <div className="card-header bg-light"> 
//                 <h5 className="mb-0"><i className="bi bi-people-fill me-2"></i>Manage Users</h5> {/* أضفت أيقونة */}
//             </div>
//             <div className="card-body">
//                 {isLoading && (
//                     <div className="text-center my-5"> 
//                         <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}> {/* تكبير Spinner */}
//                             <span className="visually-hidden">Loading users...</span>
//                         </div>
//                         <p className="mt-2">Loading Users...</p>
//                     </div>
//                 )}

//                 {error && !isLoading && <div className="alert alert-danger">{error}</div>}

//                 {!isLoading && !error && (
//                     <div className="table-responsive">
//                         <table className="table table-striped table-hover align-middle caption-top"> {/* إضافة caption-top */}
//                             <caption>List of registered users</caption> 
//                             <thead className="table-light">
//                                 <tr>
//                                     <th scope="col">ID</th>
//                                     <th scope="col">Username</th>
//                                     <th scope="col">Full Name</th>
//                                     <th scope="col">Email</th>
//                                     <th scope="col">Phone</th>
//                                     <th scope="col">Role</th>
//                                     <th scope="col">Status</th>
//                                     <th scope="col">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.length > 0 ? (
//                                     users.map(user => (
//                                         <tr key={user.id}>
//                                             <td>{user.id}</td>
//                                             <td>{user.username}</td>
//                                             <td>{user.full_name || '-'}</td>
//                                             <td>{user.email || '-'}</td>
//                                             <td>{user.phone_number || '-'}</td>
//                                             <td>
//                                                 <span className={`badge ${user.role === 'admin' ? 'text-bg-danger' : // استخدام text-bg-* في Bootstrap 5
//                                                         user.role === 'doctor' ? 'text-bg-primary' : 'text-bg-secondary'
//                                                     }`}>
//                                                     {user.role}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 <span className={`badge ${user.is_active ? 'text-bg-success' : 'text-bg-secondary'}`}>
//                                                     {user.is_active ? 'Active' : 'Inactive'}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 <Button
//                                                     variant={user.is_active ? 'outline-warning' : 'outline-success'}
//                                                     size="sm"
//                                                     className="me-2"
//                                                     onClick={() => toggleUserActiveStatus(user)}
//                                                     title={user.is_active ? `Deactivate ${user.username}` : `Activate ${user.username}`}
                                              
//                                                 >
//                                                     {user.is_active ? <ToggleOn /> : <ToggleOff />}
//                                                 </Button>

//                                                 <Button
//                                                     variant="outline-danger"
//                                                     size="sm"
//                                                     onClick={() => handleDeleteClick(user)}
//                                                     title={`Delete ${user.username}`}
                                          
//                                                 >
//                                                     <Trash />
//                                                 </Button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8" className="text-center text-muted py-4">No users found.</td> {/* زيادة الـ padding */}
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             {showDeleteModal && userToDelete && (
//                 <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Confirm User Deletion</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <p>Are you sure you want to permanently delete the user <strong>{userToDelete.username}</strong> ({userToDelete.full_name || 'N/A'})?</p>
//                         <p className="text-danger fw-bold">This action cannot be undone.</p> 
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
//                         <Button variant="danger" onClick={confirmDelete}>Delete User</Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//             <div>
//                   <AdminFeedbackManager />
//             </div>
//         </div>
//     );
// }

// export default UserList;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash, ToggleOn, ToggleOff } from 'react-bootstrap-icons';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // <-- استيراد Link

// --- (اختياري) إذا أردت منع تعطيل المستخدم الحالي ---
// import { jwtDecode } from "jwt-decode";

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    // const [currentUserId, setCurrentUserId] = useState(null); // (اختياري)

    // --- (اختياري) جلب ID المستخدم الحالي ---
    // useEffect(() => {
    //     const token = localStorage.getItem('access_token');
    //     if (token) {
    //         try {
    //             const decodedToken = jwtDecode(token);
    //             setCurrentUserId(decodedToken.user_id);
    //         } catch (e) {
    //             console.error("Error decoding token:", e);
    //             // handleLogout();
    //         }
    //     }
    // }, []);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('access_token');

        if (!token) {
            setError("Authentication required. Please log in again.");
            setIsLoading(false);
            // history.push('/admin/login');
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log("Fetched Users:", response.data); // أبقيت هذا مؤقتًا إذا أردت استخدامه للتصحيح
            setUsers(response.data);
        } catch (err) {
            console.error("Error fetching users:", err.response || err.message);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError("Session expired or invalid credentials. Please log in again.");
            } else {
                setError("Failed to fetch users. Please check the server connection or try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        const token = localStorage.getItem('access_token');
        if (!token) {
            setError("Authentication required for deletion.");
            setShowDeleteModal(false);
            return;
        }

        // --- (اختياري) منع حذف الأدمن لنفسه ---
        // if (userToDelete.id === currentUserId) {
        //    alert("You cannot delete your own account.");
        //    setShowDeleteModal(false);
        //    return;
        // }

        try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${userToDelete.id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
            setError(null);

        } catch (err) {
            console.error("Error deleting user:", err.response || err.message);
            let errorMsg = `Failed to delete user ${userToDelete.username}.`;
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    errorMsg = "Permission denied or session expired.";
                } else if (err.response.data && err.response.data.detail) {
                    errorMsg = err.response.data.detail;
                }
            }
            setError(errorMsg);
            setShowDeleteModal(false);
        }
    };

    const toggleUserActiveStatus = async (userToToggle) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setError("Authentication required.");
            return;
        }

        const newStatus = !userToToggle.is_active;

        // --- (اختياري) منع تعطيل الأدمن لنفسه ---
        // if (userToToggle.id === currentUserId && !newStatus) {
        //     setError("You cannot deactivate your own account.");
        //     return;
        // }

        try {
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/users/${userToToggle.id}/`,
                { is_active: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.id === userToToggle.id ? response.data : u
                )
            );
            setError(null);

        } catch (err) {
            console.error("Error toggling user status:", err.response?.data || err.message);
            let errorMsg = `Failed to update status for user ${userToToggle.username}.`;
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    errorMsg = "Permission denied or session expired.";
                } else if (err.response.data) {
                    try {
                        const errors = err.response.data;
                        errorMsg = Object.entries(errors).map(([key, value]) =>
                            `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
                        ).join('; ');
                    } catch {
                        errorMsg = err.response.data.detail || JSON.stringify(err.response.data);
                    }
                }
            }
            setError(errorMsg);
        }
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><i className="bi bi-people-fill me-2"></i>Manage Users</h5>
                {/* --- زر الانتقال إلى صفحة الفيدباك --- */}
                <Link to="/admin/feedback" className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-chat-left-text-fill me-1"></i> Manage Feedback
                </Link>
            </div>
            <div className="card-body">
                {isLoading && (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading users...</span>
                        </div>
                        <p className="mt-2">Loading Users...</p>
                    </div>
                )}

                {error && !isLoading && <div className="alert alert-danger">{error}</div>}

                {!isLoading && !error && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle caption-top">
                            <caption>List of registered users</caption>
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.full_name || '-'}</td>
                                            <td>{user.email || '-'}</td>
                                            <td>{user.phone_number || '-'}</td>
                                            <td>
                                                <span className={`badge ${user.role === 'admin' ? 'text-bg-danger' :
                                                        user.role === 'doctor' ? 'text-bg-primary' : 'text-bg-secondary'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${user.is_active ? 'text-bg-success' : 'text-bg-secondary'}`}>
                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td>
                                                <Button
                                                    variant={user.is_active ? 'outline-warning' : 'outline-success'}
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => toggleUserActiveStatus(user)}
                                                    title={user.is_active ? `Deactivate ${user.username}` : `Activate ${user.username}`}
                                                    // disabled={user.id === currentUserId || user.is_superuser} // (اختياري)
                                                >
                                                    {user.is_active ? <ToggleOn /> : <ToggleOff />}
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(user)}
                                                    title={`Delete ${user.username}`}
                                                    // disabled={user.id === currentUserId || user.is_superuser} // (اختياري)
                                                >
                                                    <Trash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted py-4">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showDeleteModal && userToDelete && (
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm User Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to permanently delete the user <strong>{userToDelete.username}</strong> ({userToDelete.full_name || 'N/A'})?</p>
                        <p className="text-danger fw-bold">This action cannot be undone.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={confirmDelete}>Delete User</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default UserList;