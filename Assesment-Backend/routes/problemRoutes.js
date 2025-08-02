import express from "express";
import {
  createProblem,
  getAllProblems,
  getSingleProblem,
  deleteProblem,
} from "../controllers/problemController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/all").get(getAllProblems);

router.route("/create").post(isAuthenticated, singleUpload, createProblem);

router
  .route("/:id")
  .get(getSingleProblem)
  .delete(isAuthenticated, deleteProblem);

export default router;
