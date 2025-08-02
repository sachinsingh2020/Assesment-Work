import express from "express";
import {
  createSolution,
  getSolutionsForProblem,
  toggleUpvote,
  deleteSolution,
} from "../controllers/solutionController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/get/:problemId").get(getSolutionsForProblem);

router.route("/create/:problemId").post(isAuthenticated, createSolution);

router.route("/upvote/:solutionId").put(isAuthenticated, toggleUpvote);

router.route("/:solutionId").delete(isAuthenticated, deleteSolution);

export default router;
