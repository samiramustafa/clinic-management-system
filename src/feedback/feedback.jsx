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
  }, []);



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
      patient: Number(formData.patient),
      doctor: Number(formData.doctor),
    };


    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/clinic/feedbacks/",
        feedbackData,
        { headers: { "Content-Type": "application/json" } }
      );


      setFeedbacks((prevFeedbacks) => [response.data, ...prevFeedbacks]);
      


      setFormData({
        feedback: "",
        rate: 0,
      });

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
    // <div className="container mt-5">
    //   <div className="container d-flex flex-column align-items-center py-5">
    //     <div className="shadow p-4" style={{ width: "500px" }}>
    <div>
      <button className="btn btn-lg btn-primary ms-5 rounded-pill" onClick={() => setShowModal(true)}>
        Add Feedback
      </button>

      {/* {submitted && (
            <div className="alert alert-success text-center" role="alert">
              Thank you for your feedback!
            </div>
          )} */}
      {submitted && (
        <div
          className="alert alert-success text-center fixed-top w-100"
          role="alert"
          style={{ marginTop: "70px", zIndex: 1050 }} // ✅ تعديل الهامش العلوي لمنع التداخل مع النافبار
        >
          Thank you for your feedback!
        </div>
      )}
      <FeedbackModal
        show={showModal}
        isEditing={false}
        onClose={() => setShowModal(false)}
        text={formData.feedback}
        setText={(text) => setFormData({ ...formData, feedback: text })}
        rate={formData.rate}
        setRate={handlerateChange}
        onSave={handleAddFeedback}
        errors={errors}
      />
    </div>



    //     </div>
    //   </div>
    // </div>
  );
};

export default Feedback;

