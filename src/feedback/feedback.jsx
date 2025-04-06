import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import FeedbackModal from "./card_feed";
import { FeedbackContext } from "./feedbackcontext";

const Feedback = () => {
  const { id } = useParams();
  const { setFeedbacks } = useContext(FeedbackContext);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [feedbacks, setFeedbacks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState({
    patient: "",
    doctor: "",
    feedback: "",
    rate: "",
    submit: "",
  });

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    feedback: "",
    rate: 0,
  });

  
  useEffect(() => {
    const fetchAuthData = async () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);

      if (!token) return;

      try {
       
        const userResponse = await axios.get(
          "http://127.0.0.1:8000/clinic/api/users/me/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userId = userResponse.data.id;

      
        const patientResponse = await axios.get(
          "http://127.0.0.1:8000/clinic/patients/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const patientData = patientResponse.data.find(
          (patient) => patient.user === userId
        );

        if (patientData) {
          setFormData((prevState) => ({
            ...prevState,
            patient: patientData.id,
            doctor: id,
          }));
        } else {
          console.log("No patient found for this user.");
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
      }
    };

    fetchAuthData();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const handleRateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      rate: prev.rate === value ? 0 : value,
    }));
    setErrors((prev) => ({ ...prev, rate: "" }));
  };


  const handleAddFeedback = async (e) => {
    e.preventDefault();

  
    const newErrors = {};
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty!";
    if (formData.rate === 0) newErrors.rate = "Please select a rating!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const feedbackData = {
      feedback: formData.feedback,
      rate: formData.rate,
      patient: formData.patient ? Number(formData.patient) : null,
      doctor: formData.doctor ? Number(formData.doctor) : null,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/clinic/feedbacks/",
        feedbackData,
        { headers: { "Content-Type": "application/json" } }
      );

      setFeedbacks((prev) => [response.data, ...prev]);
      setFormData((prev) => ({
        ...prev,
        feedback: "",
        rate: 0,
      }));
      setErrors({});
      setShowModal(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error.message);
      setErrors({
        submit: error.response?.data?.detail || "Failed to submit feedback. Please try again.",
      });
    }
  };

  return (
    <div>
      <button
        className="btn btn-lg btn-primary ms-5 rounded-pill"
        onClick={() => setShowModal(true)}
      >
        Add Feedback
      </button>

      {submitted && (
        <div
          className="alert alert-success text-center fixed-top w-100"
          role="alert"
          style={{ marginTop: "70px", zIndex: 1050 }}
        >
          Thank you for your feedback!
        </div>
      )}

      <FeedbackModal
        show={showModal}
        isEditing={false}
        onClose={() => setShowModal(false)}
        text={formData.feedback}
        setText={(text) =>
          setFormData((prev) => ({ ...prev, feedback: text }))
        }
        rate={formData.rate}
        setRate={handleRateChange}
        onSave={handleAddFeedback}
        errors={errors}
      />
    </div>
  );
};

export default Feedback;