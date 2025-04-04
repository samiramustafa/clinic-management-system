// feedbackReducer.js

const initialState = {
    feedbacks: [],
  };
  
  const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_FEEDBACK":
        return {
          ...state,
          feedbacks: [action.payload, ...state.feedbacks], // Add new feedback at the top
        };
  
      case "SET_FEEDBACKS":
        return {
          ...state,
          feedbacks: action.payload, // Load all feedbacks
        };
  
      default:
        return state;
    }
  };
  
  // Action creators
  export const addFeedback = (feedback) => ({
    type: "ADD_FEEDBACK",
    payload: feedback,
  });
  
  export const setFeedbacks = (feedbacks) => ({
    type: "SET_FEEDBACKS",
    payload: feedbacks,
  });
  
  export default feedbackReducer;
  