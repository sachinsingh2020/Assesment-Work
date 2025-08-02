import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { solutionReducer } from "./reducers/solutionReducer";
import { problemReducer } from "./reducers/problemReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    solution: solutionReducer,
    problem: problemReducer,
  },
});

export default store;

// export const server = "http://localhost:4000/api/v1";
export const server = "https://assesment-work-backend.vercel.app/api/v1";
