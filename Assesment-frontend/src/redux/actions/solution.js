import axios from "axios";
import { server } from "../store";

export const getSolutionsForProblem = (problemId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllSolutionsRequest" });

    const { data } = await axios.get(`${server}/solution/get/${problemId}`);

    dispatch({
      type: "getAllSolutionsSuccess",
      payload: data.solutions,
    });
  } catch (error) {
    dispatch({
      type: "getAllSolutionsFail",
      payload: error.response?.data?.message,
    });
  }
};

export const createSolution = (problemId, description) => async (dispatch) => {
  try {
    dispatch({ type: "addSolutionRequest" });

    const { data } = await axios.post(
      `${server}/solution/create/${problemId}`,
      { description },
      { withCredentials: true }
    );

    dispatch({
      type: "addSolutionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addSolutionFail",
      payload: error.response?.data?.message,
    });
  }
};

export const toggleUpvote = (solutionId) => async (dispatch) => {
  try {
    dispatch({ type: "toggleUpvoteRequest" });

    const { data } = await axios.put(
      `${server}/solution/upvote/${solutionId}`,
      {},
      { withCredentials: true }
    );

    dispatch({
      type: "toggleUpvoteSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "toggleUpvoteFail",
      payload: error.response?.data?.message,
    });
  }
};

export const deleteSolution = (solutionId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteSolutionRequest" });

    const { data } = await axios.delete(`${server}/solution/${solutionId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteSolutionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteSolutionFail",
      payload: error.response?.data?.message,
    });
  }
};
