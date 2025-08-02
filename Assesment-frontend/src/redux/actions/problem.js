import axios from "axios";
import { server } from "../store";

export const getAllProblems = () => async (dispatch) => {
  try {
    console.log("in the getAllProblem fuction");
    dispatch({ type: "getAllProblemsRequest" });
    console.log({ server });
    const { data } = await axios.get(`${server}/problem/all`);
    dispatch({
      type: "getAllProblemsSuccess",
      payload: data.problems,
    });
  } catch (error) {
    dispatch({
      type: "getAllProblemsFail",
      payload: error.response?.data?.message,
    });
  }
};

export const getSingleProblem = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSingleProblemRequest" });

    const { data } = await axios.get(`${server}/problem/${id}`);
    dispatch({
      type: "getSingleProblemSuccess",
      payload: data.problem,
    });
  } catch (error) {
    dispatch({
      type: "getSingleProblemFail",
      payload: error.response?.data?.message,
    });
  }
};

export const createProblem = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "createProblemRequest" });

    const { data } = await axios.post(`${server}/problem/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({
      type: "createProblemSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "createProblemFail",
      payload: error.response?.data?.message,
    });
  }
};

export const deleteProblem = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProblemRequest" });

    const { data } = await axios.delete(`${server}/problem/${id}`, {
      withCredentials: true,
    });

    console.log({ data });

    dispatch({
      type: "deleteProblemSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProblemFail",
      payload: error.response?.data?.message,
    });
  }
};
