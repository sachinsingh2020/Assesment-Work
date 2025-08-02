import { createAction, createReducer } from "@reduxjs/toolkit";

const addProblemRequest = createAction("addProblemRequest");
const addProblemSuccess = createAction("addProblemSuccess");
const addProblemFail = createAction("addProblemFail");

const getAllProblemsRequest = createAction("getAllProblemsRequest");
const getAllProblemsSuccess = createAction("getAllProblemsSuccess");
const getAllProblemsFail = createAction("getAllProblemsFail");

const getSingleProblemRequest = createAction("getSingleProblemRequest");
const getSingleProblemSuccess = createAction("getSingleProblemSuccess");
const getSingleProblemFail = createAction("getSingleProblemFail");

const clearError = createAction("clearError");
const clearMessage = createAction("clearMessage");

export const problemReducer = createReducer({}, (builder) => {
  builder
    .addCase(addProblemRequest, (state) => {
      state.loading = true;
    })
    .addCase(addProblemSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase(addProblemFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getAllProblemsRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAllProblemsSuccess, (state, action) => {
      state.loading = false;
      state.problems = action.payload;
    })
    .addCase(getAllProblemsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getSingleProblemRequest, (state) => {
      state.loading = true;
    })
    .addCase(getSingleProblemSuccess, (state, action) => {
      state.loading = false;
      state.singleProblem = action.payload;
    })
    .addCase(getSingleProblemFail, (state, action) => {
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
