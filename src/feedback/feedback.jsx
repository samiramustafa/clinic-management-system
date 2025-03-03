// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

// const Feedback = () => {

//   const [formData, setFormData] = useState({
//     user_name: "",
//     feedback: "",
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [errors, setErrors] = useState([]);

//   //  const queryParams = new URLSearchParams(useLocation().search);
//   // const feedbackId = queryParams.get("feedback"); 
  

 
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

 
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.user_name || !formData.feedback) {
//       return; 
//     }

//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 3000); 

   
//     axios
//       .post("https://retoolapi.dev/yXHfgN/feeback_and_rating", formData)
//       .then((response) => {
//         console.log("Feedback submitted successfully:", response.data);
       
//       })
//       .catch((error) => {
//         setErrors("Error submitting feedback");
//         console.error("Error:", error);
//       });


    
//     setFormData({ user_name: "", feedback: "" });
//   };

     

   

//   return (
//     <div className="container mt-5">
//          <div className="container d-flex flex-column align-items-center py-5">
//          <div className="shadow p-4" style={{ width: "500px" }}>
//       <h2 className="text-center">Feedback Form</h2>

//       {submitted && (
//         <div className="alert alert-success text-center" role="alert">
//           Thank you for your feedback! 
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>

//         <div className="mb-3">
//           <label className="form-label">Your Name</label>
//           <input type="text" className="form-control" name="user_name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
//         </div>

       

//         <div className="mb-3">
//           <label className="form-label">Your Feedback</label>
//           <textarea className="form-control" name="feedback" value={formData.feedback} onChange={handleChange} rows="4" placeholder="Write your feedback..." required />
//         </div>

    

  

//         <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
//       </form>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Feedback;


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Feedback = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    feedback: "",
  });
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ user_name: "", feedback: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

 
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = "Name is required!";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    axios
      .post("https://retoolapi.dev/yXHfgN/feeback_and_rating", formData)
      .then(() => {
        console.log("Feedback submitted successfully");

       
        history.push("/feedbacklist");
      })
      .catch(() => console.error("Error submitting feedback"));

    setFormData({ user_name: "", feedback: "" });
  };

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
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className={`form-control ${errors.user_name ? "border border-danger" : ""}`}
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.user_name && <div className="text-danger">{errors.user_name}</div>}
            </div>

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
