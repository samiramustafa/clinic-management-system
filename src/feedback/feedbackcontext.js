// FeedbackContext.js
import React, { createContext, useState } from "react";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  return (
    <FeedbackContext.Provider value={{ feedbacks, setFeedbacks }}>
      {children}
    </FeedbackContext.Provider>
  );
};