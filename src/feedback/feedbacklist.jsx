

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function FeedbackList(props) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [errors, setErrors] = useState(null);
  const { pageNumber } = useParams();
  const [currentFeedback, setCurrentFeedback] = useState(Number(pageNumber) || 1);
  const [feedPerPage] = useState(3);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updatedRate, setUpdatedRate] = useState(0);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/clinic/feedbacks")
  //     .then((response) => {
  //       const doctorFeedbacks = response.data.filter(rate => rate.doctor === props.doc_id);
  //       console.log("Doctor Feedbacks:", doctorFeedbacks);
        
  //       console.log(response.data)
  //       setFeedbacks(response.data)
  //       console.log(feedbacks)



  //           console.log("Doctor Feedbacks:", doctorFeedbacks);

          
  //     })
  //     .catch(() => setErrors("Error fetching feedback"));
  // }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clinic/feedbacks")
      .then((response) => {
        // console.log(response.data)
        setFeedbacks(response.data)
      })
      .catch(() => setErrors("Error fetching feedback"));
  }, []);


  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      axios.delete(`http://127.0.0.1:8000/clinic/feedbacks/${deleteId}/`)
        .then(() => {
          setFeedbacks((prevFeedbacks) => prevFeedbacks.filter(fb => fb.id !== deleteId));
          setShowModal(false);
        })
        .catch(() => setErrors("Error deleting feedback"));
    }
  };



  const handleEditClick = (feedback) => {
    setEditingFeedback(feedback);
    setUpdatedText(feedback.feedback);
  };


  const handleUpdate = () => {
    if (!updatedText.trim()) {
      alert("Feedback cannot be empty!");
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/clinic/feedbacks/${editingFeedback.id}/`, {
        ...editingFeedback,
        feedback: updatedText,
        rate: updatedRate,
      })
      .then((response) => {
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.map((fb) => (fb.id === editingFeedback.id ? response.data : fb))
        );
        setEditingFeedback(null);
      })
      .catch(() => setErrors("Error updating feedback"));
  };

  // Pagination logic
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
      <h3 className="mb-3 text-primary">
        <i className="bi bi-star-half me-1"></i> Patients' Reviews
      </h3>

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
                <span className="text-warning">
                  {"⭐".repeat(fb.rate)} <span className="text-muted">({fb.rate}/5)</span>
                </span>
                <br />

                <button className="btn text-danger" onClick={() => handleDeleteClick(fb.id)}>
                  Delete
                </button>
                <button className="btn text-primary" onClick={() => handleEditClick(fb)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">No feedback available yet.</p>
      )}





      {editingFeedback && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Feedback</h5>
                <button className="btn-close" onClick={() => setEditingFeedback(null)}></button>
              </div>

              <div className="modal-body">
            
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                ></textarea>
                <div className="mb-3">
                  <label className="form-label">Your rate</label>
                  <div className="d-flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setUpdatedRate(star)}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          transition: "color 0.3s ease-in-out, transform 0.2s",
                          color: updatedRate >= star ? "#ffcc00" : "#ccc",
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = "scale(1.3)")}
                        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                      >
                        {updatedRate >= star ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingFeedback(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
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


      <nav className="mt-4">
        <ul className="pagination justify-content-center flex-wrap">
          <li className={`page-item ${currentFeedback === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentFeedback - 1)}>
              Previous
            </button>
          </li>

          {[...Array(Math.ceil(feedbacks.length / feedPerPage))].map((_, i) => (
            <li key={i} className={`page-item ${currentFeedback === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${currentFeedback === Math.ceil(feedbacks.length / feedPerPage) ? "disabled" : ""
              }`}
          >
            <button className="page-link" onClick={() => paginate(currentFeedback + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>

      {errors && <p className="text-danger">{errors}</p>}
    </div>
  );
}

export default FeedbackList;
