import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// --- 👇 استيراد الأيقونات والمودال ---
import { CheckCircleFill, XCircleFill, ToggleOn, ToggleOff, PencilSquare, Trash3 } from 'react-bootstrap-icons';
import FeedbackEditModal from './FeedbackEditModal'; // تأكد من المسار الصحيح
import { Modal, Button } from 'react-bootstrap'; // لاستيراد مكونات المودال

function AdminFeedbackManager() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    // --- 👇 حالات جديدة للمودالات ---
    const [editingFeedbackData, setEditingFeedbackData] = useState(null); // بيانات التقييم للتعديل
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [feedbackToDelete, setFeedbackToDelete] = useState(null); // بيانات التقييم للحذف

    // ... (fetchAdminFeedbacks كما هي) ...
    const fetchAdminFeedbacks = useCallback(async () => {
         setIsLoading(true);
         setError(null);
         const token = localStorage.getItem('access_token');
         if (!token) { /* ... */ return; }
         let apiUrl = 'http://127.0.0.1:8000/api/admin/feedbacks/';
         if (filter === 'active') apiUrl += '?is_active=true';
         else if (filter === 'inactive') apiUrl += '?is_active=false';
         try {
             const response = await axios.get(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
             setFeedbacks(response.data);
             console.log("Fetched Admin Feedbacks:", response.data);
         } catch (err) { /* ... */ }
         finally { setIsLoading(false); }
    }, [filter]);

    useEffect(() => {
         fetchAdminFeedbacks();
    }, [fetchAdminFeedbacks]);


    // --- 👇 دالة لفتح مودال التعديل ---
    const handleEditClick = (feedback) => {
        setEditingFeedbackData(feedback);
    };

    // --- 👇 دالة لحفظ التعديلات (تُمرر للمودال) ---
    const handleSaveChanges = useCallback(async (feedbackId, updatedData) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error("Authentication required."); // ارمِ خطأ ليعالجه المودال
        }

        try {
            // --- استدعاء API التحديث (PUT أو PATCH) ---
            const response = await axios.put( // استخدام PUT لتحديث شامل
                `http://127.0.0.1:8000/api/admin/feedbacks/${feedbackId}/`,
                updatedData, // البيانات المحدثة من المودال
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Feedback updated successfully:", response.data);
            // --- تحديث الحالة في الفرونت إند ---
            setFeedbacks(prevFeedbacks =>
                prevFeedbacks.map(fb => (fb.id === feedbackId ? response.data : fb))
            );
            setError(null); // مسح أي خطأ سابق عند النجاح
             // يمكنك إضافة رسالة نجاح هنا
        } catch (err) {
            console.error("Error saving feedback:", err.response || err.message);
            // رمي الخطأ مرة أخرى ليعرضه المودال أو يعالجه بشكل مناسب
            throw err;
        }
    }, []); // لا تعتمد على شيء يتغير كثيرًا، أو أضف التبعيات اللازمة

    // --- 👇 دوال الحذف ---
    const handleDeleteClick = (feedback) => {
        setFeedbackToDelete(feedback);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
         if (!feedbackToDelete) return;
         const token = localStorage.getItem('access_token');
         if (!token) { /* ... handle error ... */ return; }
         try {
             await axios.delete(`http://127.0.0.1:8000/api/admin/feedbacks/${feedbackToDelete.id}/`, {
                 headers: { Authorization: `Bearer ${token}` }
             });
             setFeedbacks(prevFeedbacks => prevFeedbacks.filter(fb => fb.id !== feedbackToDelete.id));
             setShowDeleteModal(false);
            //  console.log(`Feedback ${feedbackToDelete.id} deleted successfully.`);
             setFeedbackToDelete(null);
             setError(null);
         } catch (err) {
             console.error("Error deleting feedback:", err.response || err.message);
             setError(`Failed to delete feedback ${feedbackToDelete.id}.`);
             setShowDeleteModal(false);
         }
    };

    // --- 👇 دالة تبديل الحالة (لم نعد بحاجة لها إذا كان التعديل يتم عبر المودال) ---
    // const toggleFeedbackStatus = async (feedback) => { ... };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                {/* ... (العنوان وأزرار الفلترة كما هي) ... */}
            </div>
            <div className="card-body">
                {/* ... (عرض التحميل والخطأ كما هو) ... */}
                {!isLoading && !error && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Rating</th>
                                    <th style={{minWidth: '200px'}}>Feedback</th> {/* تحديد عرض أدنى */}
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Admin Notes</th> {/* إضافة عمود الملاحظات */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.length > 0 ? (
                                    feedbacks.map(fb => (
                                        <tr key={fb.id}>
                                            <td>{fb.id}</td>
                                            <td>{fb.patient_name || 'N/A'}</td>
                                            <td>{fb.doctor_name || 'N/A'}</td>
                                            <td>{'⭐'.repeat(fb.rate)} ({fb.rate})</td>
                                            <td>{fb.feedback}</td>
                                            <td>{new Date(fb.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`badge ${fb.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                                    {fb.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            {/* عرض ملاحظات الأدمن */}
                                            <td>{fb.admin_notes || '-'}</td>
                                            <td>
                                                {/* --- 👇 أزرار التعديل والحذف --- */}
                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => handleEditClick(fb)}
                                                    title="Edit Feedback"
                                                >
                                                    <PencilSquare size={16} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDeleteClick(fb)}
                                                    title="Delete Feedback"
                                                >
                                                    <Trash3 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center text-muted">No feedback matching the filter.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- 👇 مودال التعديل --- */}
            {editingFeedbackData && (
                <FeedbackEditModal
                    show={!!editingFeedbackData}
                    onClose={() => setEditingFeedbackData(null)}
                    feedbackData={editingFeedbackData}
                    onSave={handleSaveChanges} // تمرير دالة الحفظ
                    onError={(msg) => setError(msg)} // تمرير دالة لعرض الخطأ من المودال
                />
            )}

             {/* --- 👇 مودال تأكيد الحذف --- */}
            {showDeleteModal && feedbackToDelete && (
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                   <Modal.Header closeButton>
                       <Modal.Title>Confirm Feedback Deletion</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <p>Are you sure you want to permanently delete the feedback from <strong>{feedbackToDelete.patient_name || 'Unknown'}</strong> regarding Dr. <strong>{feedbackToDelete.doctor_name || 'Unknown'}</strong>?</p>
                       <p className="text-danger">This action cannot be undone.</p>
                   </Modal.Body>
                   <Modal.Footer>
                       <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                       <Button variant="danger" onClick={confirmDelete}>Delete Feedback</Button>
                   </Modal.Footer>
               </Modal>
            )}

        </div>
    );
}

export default AdminFeedbackManager;