



import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import FeedbackModal from "./card_feed";
import { FeedbackContext } from "./feedbackcontext";

function FeedbackList() {
  const { id, pageNumber } = useParams();
  const { feedbacks, setFeedbacks } = useContext(FeedbackContext);
  const [errors, setErrors] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState(Number(pageNumber) || 1);
  const [feedPerPage] = useState(3);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updatedRate, setUpdatedRate] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const fetchAuthData = async () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
      if (!token) return;
      try {
        const userResponse = await axios.get(
          "http://127.0.0.1:8000/api/users/me/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userId = userResponse.data.id;
        const patientResponse = await axios.get(
          "http://127.0.0.1:8000/api/patients/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const patientData = patientResponse.data.find(
          (patient) => patient.user === userId
        );

        if (patientData) {
          setCurrentUserId(patientData.id); 
          console.log("Patient ID:", patientData.id);
        } else {
          console.log("No patient found for this user.");
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
      }
    };

    fetchAuthData();
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/feedbacks/?doctor_id=${id}&ordering=-created_at`)
      .then((response) => setFeedbacks(response.data))
      .catch(() => setErrors("Error fetching feedback"));
  }, [id, setFeedbacks]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      axios.delete(`http://127.0.0.1:8000/api/feedbacks/${deleteId}/`)
        .then(() => {
          setFeedbacks((prevFeedbacks) => {
            const updatedFeedbacks = prevFeedbacks.filter(fb => fb.id !== deleteId);
            const totalPages = Math.ceil(updatedFeedbacks.length / feedPerPage);
            if (currentFeedback > totalPages) {
              setCurrentFeedback((prevPage) => Math.max(prevPage - 1, 1));
            }
            return updatedFeedbacks;
          });
          setShowModal(false);
        })
        .catch(() => setErrors("Error deleting feedback"));
    }
  };

  const handleEditClick = (feedback) => {
    setEditingFeedback(feedback);
    setUpdatedText(feedback.feedback);
    setUpdatedRate(feedback.rate);
  };

  const handleUpdate = () => {
    if (!updatedText.trim()) {
      alert("Feedback cannot be empty!");
      return;
    }

    axios.put(`http://127.0.0.1:8000/clinic/feedbacks/${editingFeedback.id}/`, {
        ...editingFeedback,
        feedback: updatedText,
        rate: updatedRate,
      })
      .then((response) => {
        setFeedbacks((prev) => prev.map((fb) => (fb.id === editingFeedback.id ? response.data : fb)));
        setEditingFeedback(null);
      })
      .catch(() => setErrors("Error updating feedback"));
  };

  const lastFeedIndex = currentFeedback * feedPerPage;
  const firstFeedIndex = lastFeedIndex - feedPerPage;
  const currentFeed = feedbacks.slice(firstFeedIndex, lastFeedIndex);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(feedbacks.length / feedPerPage)) {
      setCurrentFeedback(pageNumber);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-primary">Patients' Reviews</h3>

      {feedbacks.length > 0 ? (
        currentFeed.map((fb) => (
          <div key={fb.id} className="card mb-3 shadow-sm">
            <div className="card-body d-flex">
              <img
                src={fb.patient?.avatar || "default-avatar.png"}
                alt="Avatar"
                className="rounded-circle me-3"
                width="50"
                height="50"
              />
              <div>
                <h6 className="mb-1">{fb.patient_name || "Unknown Patient"}</h6>
                <p className="mt-2 mb-1">{fb.feedback}</p>
                <span className="text-warning">{"⭐".repeat(fb.rate)} <span className="text-dark">({fb.rate}/5)</span></span>
                <br />
               
                {currentUserId && fb.patient === currentUserId && (
                  <>
                    <button className="btn text-danger" onClick={() => handleDeleteClick(fb.id)}>Delete</button>
                    <button className="btn text-primary" onClick={() => handleEditClick(fb)}>Edit</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">No feedback available yet.</p>
      )}

      {editingFeedback && (
        <FeedbackModal
          show={!!editingFeedback}
          isEditing={!!editingFeedback}
          onClose={() => setEditingFeedback(null)}
          text={updatedText}
          setText={setUpdatedText}
          rate={updatedRate}
          setRate={setUpdatedRate}
          onSave={handleUpdate}
        />
      )}

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p className="fs-4">Are you sure you want to delete this feedback?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {feedbacks.length > feedPerPage && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentFeedback === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentFeedback - 1)}>Previous</button>
            </li>
            {[...Array(Math.ceil(feedbacks.length / feedPerPage))].map((_, i) => (
              <li key={i} className={`page-item ${currentFeedback === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentFeedback === Math.ceil(feedbacks.length / feedPerPage) ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentFeedback + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}

      {errors && <p className="text-danger">{errors}</p>}
    </div>
  );
}

export default FeedbackList;