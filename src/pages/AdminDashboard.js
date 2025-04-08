// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Trash } from 'react-bootstrap-icons'; // استيراد أيقونة الحذف
// import AdminFeedbackManager from '../component/admin/AdminFeedbackManager';
// function UserList() {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [userToDelete, setUserToDelete] = useState(null); // لتخزين المستخدم المراد حذفه

//     // دالة لجلب المستخدمين
//     const fetchUsers = useCallback(async () => {
//         setIsLoading(true);
//         setError(null);
//         const token = localStorage.getItem('access_token'); // الحصول على توكن الأدمن

//         if (!token) {
//             setError("Authentication required. Please log in again.");
//             setIsLoading(false);
//             // يمكنك إعادة التوجيه لصفحة اللوجن هنا إذا أردت
//             return;
//         }

//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/users/', {
//                 headers: { Authorization: `Bearer ${token}` } // إرسال التوكن
//             });
//             console.log("Fetched Users:", response.data);
//             // فلترة لاستبعاد الأدمن الحالي (اختياري ولكن جيد)
//             // const currentUser = jwtDecode(token); // تحتاج لمكتبة مثل jwt-decode
//             // setUsers(response.data.filter(user => user.id !== currentUser.user_id));
//             setUsers(response.data); // حالياً يعرض كل المستخدمين
//         } catch (err) {
//             console.error("Error fetching users:", err.response || err.message);
//             if (err.response && err.response.status === 401) {
//                  setError("Session expired or invalid. Please log in again.");
//                  // امسح التوكن وأعد التوجيه
//                  localStorage.removeItem('access_token');
//                  localStorage.removeItem('refresh_token');
//                  localStorage.removeItem('isAdmin');
//                  // history.push('/admin/login'); // ستحتاج useHistory هنا
//             } else {
//                 setError("Failed to fetch users. Please try again later.");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     }, []); // لا يعتمد على شيء حالياً

//     useEffect(() => {
//         fetchUsers();
//     }, [fetchUsers]); // تشغيل عند التحميل

//     // دوال الحذف
//     const handleDeleteClick = (user) => {
//         setUserToDelete(user);
//         setShowDeleteModal(true);
//     };

//     const confirmDelete = async () => {
//         if (!userToDelete) return;

//         const token = localStorage.getItem('access_token');
//         if (!token) {
//             setError("Authentication required.");
//             setShowDeleteModal(false);
//             return;
//         }

//         try {
//             // --- استدعاء API الحذف ---
//             console.log("Token being sent:", token)
//             await axios.delete(`http://127.0.0.1:8000/api/users/${userToDelete.id}/`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             // --- تحديث الحالة بعد الحذف الناجح ---
//             setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
//             setShowDeleteModal(false);
//             setUserToDelete(null);
//             // يمكنك إضافة رسالة نجاح هنا
//         } catch (err) {
//             console.error("Error deleting user:", err.response || err.message);
//              if (err.response && err.response.status === 401) {
//                  setError("Session expired or invalid. Please log in again.");
//             } else {
//                 setError(`Failed to delete user ${userToDelete.username}. Please try again.`);
//             }
//             setShowDeleteModal(false);
//         }
//     };

//     return (
//         <div className="card shadow-sm">
//             <div className="card-header">
//                 <h5 className="mb-0">Manage Users</h5>
//             </div>
//             <div className="card-body">
//                 {isLoading && (
//                     <div className="text-center">
//                         <div className="spinner-border text-primary" role="status">
//                             <span className="visually-hidden">Loading users...</span>
//                         </div>
//                     </div>
//                 )}
//                 {error && <div className="alert alert-danger">{error}</div>}
//                 {!isLoading && !error && (
//                     <div className="table-responsive">
//                         <table className="table table-striped table-hover align-middle">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Username</th>
//                                     <th>Full Name</th>
//                                     <th>Email</th>
//                                     <th>Phone</th>
//                                     <th>Role</th>
//                                     <th>Active</th>
//                                     <th>Actions</th>
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
//                                                 <span className={`badge ${
//                                                     user.role === 'admin' ? 'bg-danger' :
//                                                     user.role === 'doctor' ? 'bg-primary' : 'bg-secondary'
//                                                 }`}>
//                                                     {user.role}
//                                                 </span>
//                                             </td>
//                                             <td>{user.is_active ? 'Yes' : 'No'}</td>
//                                             <td>
//                                                 {/* زر الحذف (يمكن إضافة زر تعديل لاحقًا) */}
//                                                 <button
//                                                     className="btn btn-sm btn-outline-danger"
//                                                     onClick={() => handleDeleteClick(user)}
//                                                     title={`Delete ${user.username}`}
//                                                     // يمكنك تعطيل الزر إذا كان هو الأدمن الحالي
//                                                     // disabled={currentUser?.user_id === user.id}
//                                                 >
//                                                     <Trash size={16} />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8" className="text-center text-muted">No users found.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             {/* مودال تأكيد الحذف */}
//             {showDeleteModal && userToDelete && (
//                 <>
//                     <div className="modal-backdrop fade show"></div>
//                     <div className="modal fade show d-block" tabIndex="-1" style={{ display: 'block' }} aria-modal="true" role="dialog">
//                         <div className="modal-dialog modal-dialog-centered">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h5 className="modal-title">Confirm User Deletion</h5>
//                                     <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)} aria-label="Close"></button>
//                                 </div>
//                                 <div className="modal-body">
//                                     <p>Are you sure you want to permanently delete the user <strong>{userToDelete.username}</strong> ({userToDelete.full_name})?</p>
//                                     <p className="text-danger">This action cannot be undone.</p>
//                                 </div>
//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
//                                     <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete User</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//              <div>
//                  <AdminFeedbackManager />
//             </div>
//         </div>
//     );
// }

// export default UserList;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// --- استيراد الأيقونات ---
import { Trash, ToggleOn, ToggleOff } from 'react-bootstrap-icons';
// --- استيراد مكونات المودال (إذا لم تكن مستورده في مكان آخر) ---
import { Modal, Button } from 'react-bootstrap';
import AdminFeedbackManager from '../component/admin/AdminFeedbackManager';
// 

// --- (اختياري) إذا أردت منع تعطيل المستخدم الحالي، ستحتاج لهذه المكتبة ---
// import { jwtDecode } from "jwt-decode"; // قم بتثبيتها: npm install jwt-decode

function UserList() {
    // --- State Hooks ---
    const [users, setUsers] = useState([]); // قائمة المستخدمين
    const [error, setError] = useState(null); // رسائل الخطأ
    const [isLoading, setIsLoading] = useState(false); // حالة التحميل
    const [showDeleteModal, setShowDeleteModal] = useState(false); // لإظهار/إخفاء مودال الحذف
    const [userToDelete, setUserToDelete] = useState(null); // المستخدم المراد حذفه
    // --- (اختياري) حالة لتتبع ID المستخدم الحالي ---
    // const [currentUserId, setCurrentUserId] = useState(null);

    // --- (اختياري) جلب ID المستخدم الحالي من التوكن ---
    // useEffect(() => {
    //     const token = localStorage.getItem('access_token');
    //     if (token) {
    //         try {
    //             const decodedToken = jwtDecode(token);
    //             setCurrentUserId(decodedToken.user_id); // تأكد من أن اسم الحقل user_id في التوكن
    //         } catch (e) {
    //             console.error("Error decoding token:", e);
    //             // يمكنك التعامل مع خطأ التوكن هنا (مثل تسجيل الخروج)
    //             // handleLogout(); // ستحتاج لتمرير دالة handleLogout أو تعريفها هنا
    //         }
    //     }
    // }, []);


    // --- دالة جلب قائمة المستخدمين من الـ API ---
    const fetchUsers = useCallback(async () => {
        setIsLoading(true); // بدء التحميل
        setError(null); // مسح أي خطأ سابق
        const token = localStorage.getItem('access_token');

        // التحقق من وجود التوكن
        if (!token) {
            setError("Authentication required. Please log in again.");
            setIsLoading(false);
            // يمكنك إعادة التوجيه لصفحة تسجيل الدخول هنا
            // history.push('/admin/login'); // تحتاج useHistory
            return;
        }

        try {
            // استدعاء API قائمة المستخدمين
            const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Fetched Users:", response.data);
            setUsers(response.data); // تحديث حالة المستخدمين بالبيانات المستلمة
        } catch (err) {
            // التعامل مع الأخطاء
            console.error("Error fetching users:", err.response || err.message);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError("Session expired or invalid credentials. Please log in again.");
                // يمكنك إضافة منطق تسجيل الخروج التلقائي هنا
            } else {
                setError("Failed to fetch users. Please check the server connection or try again later.");
            }
        } finally {
            setIsLoading(false); // انتهاء التحميل (سواء نجح أو فشل)
        }
    }, []); // useCallback مع [] يعني أنها تُنشأ مرة واحدة

    // --- useEffect لتشغيل fetchUsers عند تحميل المكون ---
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // الاعتماد على fetchUsers المستقرة


    // --- دالة فتح مودال تأكيد الحذف ---
    const handleDeleteClick = (user) => {
        setUserToDelete(user); // تخزين بيانات المستخدم المراد حذفه
        setShowDeleteModal(true); // إظهار المودال
    };

    // --- دالة تأكيد وتنفيذ الحذف ---
    const confirmDelete = async () => {
        if (!userToDelete) return; // تأكد من وجود مستخدم للحذف

        const token = localStorage.getItem('access_token');
        if (!token) {
            setError("Authentication required for deletion.");
            setShowDeleteModal(false); // أغلق المودال
            return;
        }

        // --- (اختياري) منع حذف الأدمن لنفسه ---
        // if (userToDelete.id === currentUserId) {
        //    alert("You cannot delete your own account.");
        //    setShowDeleteModal(false);
        //    return;
        // }

        try {
            // استدعاء API الحذف
            await axios.delete(`http://127.0.0.1:8000/api/users/${userToDelete.id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // تحديث قائمة المستخدمين في الواجهة بعد الحذف الناجح
            setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
            setShowDeleteModal(false); // إغلاق المودال
            setUserToDelete(null); // مسح المستخدم المحدد للحذف
            setError(null); // مسح أي خطأ سابق
            // يمكنك عرض رسالة نجاح مؤقتة (toast)

        } catch (err) {
            // التعامل مع أخطاء الحذف
            console.error("Error deleting user:", err.response || err.message);
            let errorMsg = `Failed to delete user ${userToDelete.username}.`;
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    errorMsg = "Permission denied or session expired.";
                } else if (err.response.data && err.response.data.detail) {
                    errorMsg = err.response.data.detail; // عرض رسالة الخطأ من الباك إند
                }
            }
            setError(errorMsg);
            setShowDeleteModal(false); // أغلق المودال حتى عند الفشل
        }
    };


    // --- دالة تبديل حالة تفعيل/تعطيل المستخدم ---
    const toggleUserActiveStatus = async (userToToggle) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setError("Authentication required.");
            return;
        }

        const newStatus = !userToToggle.is_active; // حساب الحالة الجديدة

        // --- (اختياري) منع تعطيل الأدمن لنفسه ---
        // if (userToToggle.id === currentUserId && !newStatus) {
        //     setError("You cannot deactivate your own account.");
        //     return;
        // }
        // يمكنك إضافة تحقق هنا لمنع تعطيل السوبر يوزر إذا كان userToToggle.is_superuser صحيحًا

        try {
            // استدعاء API التحديث (PATCH) لتغيير is_active فقط
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/users/${userToToggle.id}/`,
                { is_active: newStatus }, // إرسال الحالة الجديدة فقط
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // تحديث حالة المستخدم في قائمة المستخدمين بالبيانات المرتجعة
            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.id === userToToggle.id ? response.data : u
                )
            );
            setError(null); // مسح أي خطأ سابق
            // يمكنك عرض رسالة نجاح مؤقتة (toast)

        } catch (err) {
            // التعامل مع أخطاء تحديث الحالة
            console.error("Error toggling user status:", err.response?.data || err.message);
            let errorMsg = `Failed to update status for user ${userToToggle.username}.`;
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    errorMsg = "Permission denied or session expired.";
                } else if (err.response.data) {
                    // محاولة عرض خطأ التحقق من الباك إند (مثل منع تعطيل الذات)
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


    // --- JSX Rendering ---
    return (
        <div className="card shadow-sm mb-4"> {/* أضفت mb-4 */}
            <div className="card-header bg-light"> {/* غيرت لون الخلفية */}
                <h5 className="mb-0"><i className="bi bi-people-fill me-2"></i>Manage Users</h5> {/* أضفت أيقونة */}
            </div>
            <div className="card-body">
                {/* عرض مؤشر التحميل */}
                {isLoading && (
                    <div className="text-center my-5"> {/* توسيط وتكبير المسافة */}
                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}> {/* تكبير Spinner */}
                            <span className="visually-hidden">Loading users...</span>
                        </div>
                        <p className="mt-2">Loading Users...</p>
                    </div>
                )}

                {/* عرض رسالة الخطأ */}
                {error && !isLoading && <div className="alert alert-danger">{error}</div>}

                {/* عرض الجدول أو رسالة عدم وجود مستخدمين */}
                {!isLoading && !error && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle caption-top"> {/* إضافة caption-top */}
                            <caption>List of registered users</caption> {/* إضافة عنوان للجدول */}
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
                                                <span className={`badge ${user.role === 'admin' ? 'text-bg-danger' : // استخدام text-bg-* في Bootstrap 5
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
                                                {/* زر تبديل الحالة */}
                                                <Button
                                                    variant={user.is_active ? 'outline-warning' : 'outline-success'}
                                                    size="sm"
                                                    className="me-2" // مسافة لليمين
                                                    onClick={() => toggleUserActiveStatus(user)}
                                                    title={user.is_active ? `Deactivate ${user.username}` : `Activate ${user.username}`}
                                                // --- (اختياري) تعطيل الزر ---
                                                // disabled={user.id === currentUserId || user.is_superuser}
                                                >
                                                    {user.is_active ? <ToggleOn /> : <ToggleOff />}
                                                </Button>

                                                {/* زر الحذف */}
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(user)}
                                                    title={`Delete ${user.username}`}
                                                // --- (اختياري) تعطيل الزر ---
                                                // disabled={user.id === currentUserId || user.is_superuser}
                                                >
                                                    <Trash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted py-4">No users found.</td> {/* زيادة الـ padding */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                         <AdminFeedbackManager />
                    </div>
                       
                    
                )}
            </div>

            {/* مودال تأكيد الحذف */}
            {showDeleteModal && userToDelete && (
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm User Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to permanently delete the user <strong>{userToDelete.username}</strong> ({userToDelete.full_name || 'N/A'})?</p>
                        <p className="text-danger fw-bold">This action cannot be undone.</p> {/* تأكيد أقوى */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={confirmDelete}>Delete User</Button>
                    </Modal.Footer>
                </Modal>
            )}
            {/* <div>
                  <AdminFeedbackManager />
            </div> */}
        </div>
    );
}

export default UserList;