import { createAction, createReducer } from "@reduxjs/toolkit";

const addSolutionRequest = createAction("addSolutionRequest");
const addSolutionSuccess = createAction("addSolutionSuccess");
const addSolutionFail = createAction("addSolutionFail");

const getAllSolutionsRequest = createAction("getAllSolutionsRequest");
const getAllSolutionsSuccess = createAction("getAllSolutionsSuccess");
const getAllSolutionsFail = createAction("getAllSolutionsFail");

const deleteSolutionRequest = createAction("deleteSolutionRequest");
const deleteSolutionSuccess = createAction("deleteSolutionSuccess");
const deleteSolutionFail = createAction("deleteSolutionFail");

const toggleUpvoteRequest = createAction("toggleUpvoteRequest");
const toggleUpvoteSuccess = createAction("toggleUpvoteSuccess");
const toggleUpvoteFail = createAction("toggleUpvoteFail");

const clearError = createAction("clearError");
const clearMessage = createAction("clearMessage");

export const solutionReducer = createReducer({}, (builder) => {
  builder
    .addCase(addSolutionRequest, (state) => {
      state.loading = true;
    })
    .addCase(addSolutionSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase(addSolutionFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getAllSolutionsRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAllSolutionsSuccess, (state, action) => {
      state.loading = false;
      state.solutions = action.payload;
    })
    .addCase(getAllSolutionsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteSolutionRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteSolutionSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase(deleteSolutionFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(toggleUpvoteRequest, (state) => {
      state.loading = true;
    })
    .addCase(toggleUpvoteSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase(toggleUpvoteFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(clearMessage, (state) => {
      state.message = null;
    });
});
