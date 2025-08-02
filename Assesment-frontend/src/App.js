import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import Home from "./components/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import AllProblems from "./components/Problem/AllProblems";
import SingleProblem from "./components/Problem/SingleProblem";
import CreateProblem from "./components/Problem/CreateProblem";

import { isUserLoggedIn } from "./redux/actions/user";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/problem" /> : <Register />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/problem" /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/problem"
          element={isAuthenticated ? <AllProblems /> : <Navigate to="/login" />}
        />
        <Route
          path="/problem/:id"
          element={
            isAuthenticated ? <SingleProblem /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/problem/create"
          element={
            isAuthenticated ? <CreateProblem /> : <Navigate to="/login" />
          }
        />
      </Routes>

      <Toaster />
    </Router>
  );
};

export default App;
