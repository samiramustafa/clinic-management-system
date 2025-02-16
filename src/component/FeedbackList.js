

import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const FeedbackList = () => {

  const [feedbacks, setFeedbacks] = useState([]);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        axios.get("https://retoolapi.dev/yXHfgN/feeback_and_rating")
            .then((response) => {
              setFeedbacks(response.data)
            })
            .catch((error) => setErrors("Error"))
    }, [])

  // const [feedbacks, setFeedbacks] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     feedback: "Great service! Loved the experience.",
  //     rating: 5,
  //     avatar: "https://i.pravatar.cc/50?img=1",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     feedback: "Could be improved, but overall good!",
  //     rating: 3,
  //     avatar: "https://i.pravatar.cc/50?img=2",
  //   },
  // ]);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">User Feedback</h3>
      {feedbacks.length > 0 ? (
        feedbacks.map((fb) => (
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
                <br/>

                <Link className="btn text-danger">Delete</Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">No feedback available yet.</p>
      )}
    </div>
  );
};

export default FeedbackList;