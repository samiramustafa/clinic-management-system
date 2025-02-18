

import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function FeedbackList(props) {

  const [feedbacks, setFeedbacks] = useState([]);
  const [errors, setErrors] = useState([]);
  const queryParams = new URLSearchParams(useLocation().search);
  const feedbackId = queryParams.get("feedback");
  const { pageNumber } = useParams();
    const [currentfeedback, setcurrentfeedback] = useState(Number(pageNumber) || 1);
    const [feedperpage] = useState(3);


  useEffect(() => {
    axios.get("https://retoolapi.dev/yXHfgN/feeback_and_rating")
      .then((response) => {
        setFeedbacks(response.data)
      })
      .catch((error) => setErrors("Error"))
  }, [])

  useEffect(() => {
    if (feedbackId) {
      axios.delete(`https://retoolapi.dev/yXHfgN/feeback_and_rating/${feedbackId}`)
        .then((response) => {
          console.log("Deleted feedback successfully!");
          setFeedbacks(prevFeedbacks => prevFeedbacks.filter(fb => fb.id !== feedbackId));
        })
        .catch((error) => setErrors("Error deleting feedback"));
    }
  }, [feedbackId]);

  useEffect(() => {
    axios.put("https://retoolapi.dev/yXHfgN/feeback_and_rating" + feedbackId)
      .then((response) => {
        setFeedbacks(response.data)
      })
      .catch((error) => setErrors("Error"))
  }, [])

  // paginate
  const lastfeedIndex = currentfeedback * feedperpage;
  const firstfeedIndex = lastfeedIndex - feedperpage;
  const currentfeed = feedbacks.slice(firstfeedIndex, lastfeedIndex);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(feedbacks.length / feedperpage)) {
      setcurrentfeedback(pageNumber);
    }
  };



  return (
    <div className="container mt-4">

      <h3 className="mb-3 text-primary">
        <i className="bi bi-star-half me-1"></i>
        Patients’s Reviews </h3>

      {feedbacks.length > 0 ? (
        currentfeed.map((fb) => (
          <div key={fb.id} className="card mb-3 shadow-sm">
            <div className="card-body d-flex">
              <img src={fb.avatar} alt="Avatar" className="rounded-circle me-3" width="50" height="50" />
              <div>
                <h6 className="mb-1">{fb.user_name}</h6>
                {/* <small className="text-muted">{fb.email}</small> */}
                <p className="mt-2 mb-1">{fb.feedback}</p>
                <span className="text-warning">
                  {"⭐".repeat(fb.rate)}{" "}
                  <span className="text-muted">({fb.rate}/5)</span>

                </span>
                <br />

                <Link className="btn text-danger" to={`/Details/:${props.doc_id}?feedback=${fb.id}`}>Delete</Link>
                <Link className="btn text-danger" to={`/Details/:${props.doc_id}?feedback=${fb.id}`}>Edit</Link>

              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">No feedback available yet.</p>
      )}

      <nav className="mt-4">
        <ul className="pagination justify-content-center flex-wrap">

          <li className={`page-item ${currentfeedback === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentfeedback - 1)}>Previous</button>
          </li>


          {[...Array(Math.ceil(feedbacks.length / feedperpage))].map((_, i) => (
            <li key={i} className={`page-item ${currentfeedback === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}

          <li className={`page-item ${currentfeedback === Math.ceil(feedbacks.length / feedperpage) ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentfeedback + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>


  );
};

export default FeedbackList;