import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import FeedbackModal from "./card_feed";


const Feedback = () => {
  const { id } = useParams();

  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    const updateAuthState = () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
      if (token) {
        axios.get("http://127.0.0.1:8000/clinic/api/users/me/", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
            console.log("User Data:", response.data);
            setFormData((prevState) => ({
              ...prevState,
              patient: response.data.id || "",
              doctor: id,
            }));
          })
          .catch(error => console.error("Error fetching user data:", error));
      }
    };

    updateAuthState(); 
  }, [id]);  



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };


  const handlerateChange = (value) => {
    setFormData({ ...formData, rate: formData.rate === value ? 0 : value });
    setErrors({ ...errors, rate: "" });
  };

  const handleAddFeedback = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty!";
    if (formData.rate === 0) newErrors.rate = "Please select a rating!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }



    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

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


      setFeedbacks((prevFeedbacks) => [response.data, ...prevFeedbacks]);


      setFormData((prev) => ({
        ...prev,
        feedback: "",
        rate: 0,
      }));

      setErrors({});
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error.message);

      setErrors({
        submit:
          error.response?.data?.detail || "Failed to submit feedback. Please try again.",
      });
    }

  };

  return (

    <div>
      <button className="btn btn-lg btn-primary ms-5 rounded-pill" onClick={() => setShowModal(true)}>
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
        setText={(text) => setFormData((prev) => ({ ...prev, feedback: text }))}
        rate={formData.rate}
        setRate={handlerateChange}
        onSave={handleAddFeedback}
        errors={errors}
      />

    </div>

  );
};

export default Feedback;

