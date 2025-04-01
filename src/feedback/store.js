import { createStore, combineReducers } from "redux";
import feedbackReducer from "./feedbackReducer"; // Import feedback reducer

const rootReducer = combineReducers({
  feedback: feedbackReducer,
});

const store = createStore(rootReducer);

export default store;
