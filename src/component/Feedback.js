import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",

    feedback: "",

  });


  const [errors, setErrors] = useState({});


  const validateField = (name, value) => {
    let newErrors = "";

    if (!value) {
      return "this field is required";
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };


  const validate = () => {
    const tempErrors = {};
    Object.keys(formData).forEach((key) => {
      tempErrors[key] = validateField(key, formData[key]);
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => !tempErrors[key]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return " ";

  };

  return (
    <div className="container mt-5">
      <div className="container d-flex flex-column align-items-center py-5">
        <div className="shadow p-4" style={{ width: "500px" }}>
          <h2 className="text-center">Feedback Form</h2>



          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input type="text" className={`form-control ${errors.name ? "border border-danger" : ""}`}
                name="name" value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"

              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>



            <div className="mb-3">
              <label className="form-label">Your Feedback</label>
              <textarea className={`form-control ${errors.feedback ? "border border-danger" : ""}`}
                name="feedback" value={formData.feedback} onChange={handleChange} rows="4" placeholder="Write your feedback..." />
              {errors.feedback && <div className="text-danger">{errors.feedback}</div>}
            </div>



            <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
          </form>
        </div>       </div>
    </div>
  );
};

export default Feedback;


