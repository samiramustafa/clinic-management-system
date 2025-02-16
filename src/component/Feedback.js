import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.feedback || !formData.rating) {
      alert("Please fill all fields before submitting.");
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Hide message after 3 sec
    setFormData({ name: "", email: "", feedback: "", rating: "" }); // Reset form
  };

  return (
    <div className="container mt-5">
         <div className="container d-flex flex-column align-items-center py-5">
         <div className="shadow p-4" style={{ width: "500px" }}>
      <h2 className="text-center">Feedback Form</h2>

      {submitted && (
        <div className="alert alert-success text-center" role="alert">
          Thank you for your feedback! 🎉
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
        </div>

       

        <div className="mb-3">
          <label className="form-label">Your Feedback</label>
          <textarea className="form-control" name="feedback" value={formData.feedback} onChange={handleChange} rows="4" placeholder="Write your feedback..." required />
        </div>

  

        <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Feedback;