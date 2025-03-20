import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Feedback = () => {
  const { id } = useParams();
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    patient: "",
    doctor: "",
    feedback: "",
    rate: "",
  });

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    feedback: "",
    rate: 0,
  });


  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        setFormData((prevState) => ({
          ...prevState,
          patient: userData.id || "",
          doctor: id,
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [id]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlerateChange = (value) => {
    setFormData({ ...formData, rate: formData.rate === value ? 0 : value });
    setErrors({ ...errors, rate: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty!";
    if (formData.rate === 0) newErrors.rate = "Please select a rating!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Sending Feedback Data:", formData);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    const feedbackData = {
      feedback: formData.feedback,
      rate: formData.rate,
      patient: Number(formData.patient),
      doctor: Number(formData.doctor),
    };

    try {
      await axios.post("http://127.0.0.1:8000/clinic/feedbacks/", feedbackData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Feedback submitted successfully");
      history.push("/feedbacklist");

      // إعادة ضبط النموذج بعد الإرسال الناجح
      setFormData((prevState) => ({
        ...prevState,
        feedback: "",
        rate: 0,
      }));
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error.message);
    }
  };

  // **إعادة ضبط النموذج بعد الإرسال**
  //   setFormData({
  //     patient: feedbackData.patient,
  //     doctor: feedbackData.doctor,
  //     feedback: "",
  //     rate: 0,  // ✅ تصحيح الحقل
  //   });
  // };


  return (
    <div className="container mt-5">
      <div className="container d-flex flex-column align-items-center py-5">
        <div className="shadow p-4" style={{ width: "500px" }}>
          <h2 className="text-center">Feedback Form</h2>

          {submitted && (
            <div className="alert alert-success text-center" role="alert">
              Thank you for your feedback!
            </div>
          )}

          <form onSubmit={handleSubmit}>




            <div className="mb-3">
              <label className="form-label">Your Feedback</label>
              <textarea
                className={`form-control ${errors.feedback ? "border border-danger" : ""}`}
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows="4"
                placeholder="Write your feedback..."
              />
              {errors.feedback && <div className="text-danger">{errors.feedback}</div>}
            </div>



            <div className="mb-3">
              <label className="form-label">Your rate</label>
              <div className="d-flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handlerateChange(star)}
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      transition: "color 0.3s ease-in-out, transform 0.2s",
                      color: formData.rate >= star ? "#ffcc00" : "#ccc",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.3)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    {formData.rate >= star ? "★" : "☆"}
                  </span>
                ))}
              </div>
              {errors.rate && <div className="text-danger">{errors.rate}</div>}
            </div>



            <button type="submit" className="btn btn-primary w-100">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
