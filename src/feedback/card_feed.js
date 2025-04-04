import React from "react";

const FeedbackModal = ({ show, isEditing, onClose, text, setText, rate, setRate, onSave, errors = {} }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? "Edit Feedback" : "Add Feedback"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Write your feedback..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            {errors?.feedback && <div className="text-danger">{errors.feedback}</div>}

            <div className="mb-3">
              <label className="form-label">Your Rate</label>
              <div className="d-flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRate(star)}
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      transition: "color 0.3s ease-in-out, transform 0.2s",
                      color: rate >= star ? "#ffcc00" : "#ccc",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.3)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    {rate >= star ? "★" : "☆"}
                  </span>
                ))}
              </div>
              {errors?.rate && <div className="text-danger">{errors.rate}</div>}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSave}>
              {isEditing ? "Save Changes" : "Submit Feedback"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;

