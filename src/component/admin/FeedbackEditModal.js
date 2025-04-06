import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // استخدام react-bootstrap للمودال

function FeedbackEditModal({ show, onClose, feedbackData, onSave, onError }) {
    const [editedFeedback, setEditedFeedback] = useState('');
    const [editedRate, setEditedRate] = useState(0);
    const [adminNotes, setAdminNotes] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // تحديث الحالة الداخلية عند تغيير feedbackData
    useEffect(() => {
        if (feedbackData) {
            setEditedFeedback(feedbackData.feedback || '');
            setEditedRate(feedbackData.rate || 0);
            setAdminNotes(feedbackData.admin_notes || '');
            setIsActive(feedbackData.is_active !== undefined ? feedbackData.is_active : true);
        } else {
            // إعادة تعيين عند الإغلاق أو عدم وجود بيانات
            setEditedFeedback('');
            setEditedRate(0);
            setAdminNotes('');
            setIsActive(true);
        }
    }, [feedbackData]); // يعتمد على feedbackData

    const handleSave = async () => {
        if (!feedbackData) return;

        // التحقق الأساسي
        if (editedRate < 1 || editedRate > 5) {
            alert("Rating must be between 1 and 5.");
            return;
        }
         if (!editedFeedback.trim()) {
            alert("Feedback text cannot be empty.");
            return;
        }

        setIsSaving(true);
        try {
            await onSave(feedbackData.id, {
                feedback: editedFeedback,
                rate: editedRate,
                is_active: isActive,
                admin_notes: adminNotes,
                // --- 👇 مهم: يجب إرسال patient و doctor إذا كان السيريالايزر يتوقعهما ---
                // تأكد من أن feedbackData يحتوي عليهما
                patient: feedbackData.patient,
                doctor: feedbackData.doctor,
            });
            onClose(); // أغلق المودال عند النجاح
        } catch (error) {
            // يمكن لدالة onSave أن تعالج الخطأ وتعرضه، أو نعالجه هنا
            console.error("Error saving feedback:", error);
             if (onError) {
                 onError(`Failed to save feedback: ${error.message || 'Unknown error'}`);
             } else {
                 alert(`Failed to save feedback: ${error.message || 'Unknown error'}`);
             }
        } finally {
            setIsSaving(false);
        }
    };

    // التعامل مع تقييم النجوم
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`h3 me-1 ${i <= editedRate ? 'text-warning' : 'text-secondary'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setEditedRate(i)}
                    title={`Rate ${i}`}
                >
                    ⭐
                </span>
            );
        }
        return stars;
    };


    return (
        <Modal show={show} onHide={onClose} centered> {/* centered */}
            <Modal.Header closeButton>
                <Modal.Title>Edit Feedback (ID: {feedbackData?.id})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {feedbackData ? (
                    <Form>
                         {/* عرض اسم المريض والطبيب (للقراءة فقط) */}
                         <Form.Group className="mb-3">
                             <Form.Label>Patient:</Form.Label>
                             <Form.Control type="text" readOnly defaultValue={feedbackData.patient_name || 'N/A'} />
                         </Form.Group>
                          <Form.Group className="mb-3">
                             <Form.Label>Doctor:</Form.Label>
                             <Form.Control type="text" readOnly defaultValue={feedbackData.doctor_name || 'N/A'} />
                         </Form.Group>

                        {/* تعديل التقييم بالنجوم */}
                        <Form.Group className="mb-3">
                            <Form.Label>Rating:</Form.Label>
                            <div>{renderStars()}</div>
                        </Form.Group>

                        {/* تعديل نص التقييم */}
                        <Form.Group className="mb-3">
                            <Form.Label>Feedback Text:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={editedFeedback}
                                onChange={(e) => setEditedFeedback(e.target.value)}
                            />
                        </Form.Group>

                         {/* تعديل ملاحظات الأدمن */}
                        <Form.Group className="mb-3">
                            <Form.Label>Admin Notes (Optional):</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                            />
                        </Form.Group>

                        {/* تفعيل/تعطيل */}
                        <Form.Check
                            type="switch"
                            id={`feedback-active-switch-${feedbackData.id}`}
                            label={isActive ? "Active" : "Inactive"}
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="mb-3"
                        />
                    </Form>
                ) : (
                    <p>Loading feedback data...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={isSaving || !feedbackData}>
                    {isSaving ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...
                        </>
                     ) : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FeedbackEditModal;