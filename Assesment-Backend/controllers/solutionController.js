import { Solution } from "../models/solutionModel.js";
import { Problem } from "../models/problemModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

export const createSolution = catchAsyncError(async (req, res, next) => {
  const { description } = req.body;
  const { problemId } = req.params;

  if (!description) {
    return next(new ErrorHandler("Please provide a description", 400));
  }

  const problem = await Problem.findById(problemId);
  if (!problem) {
    return next(new ErrorHandler("Problem not found", 404));
  }

  const solution = await Solution.create({
    user: req.user._id,
    problem: problemId,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Solution added successfully",
    solution,
  });
});

export const getSolutionsForProblem = catchAsyncError(
  async (req, res, next) => {
    const { problemId } = req.params;

    const solutions = await Solution.find({ problem: problemId })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      solutions,
    });
  }
);

export const toggleUpvote = catchAsyncError(async (req, res, next) => {
  const { solutionId } = req.params;
  const userId = req.user._id;

  const solution = await Solution.findById(solutionId);
  if (!solution) {
    return next(new ErrorHandler("Solution not found", 404));
  }

  const alreadyUpvoted = solution.upvotes.includes(userId);

  if (alreadyUpvoted) {
    solution.upvotes = solution.upvotes.filter(
      (id) => id.toString() !== userId.toString()
    );
    await solution.save();
    res.status(200).json({ success: true, message: "Upvote removed" });
  } else {
    solution.upvotes.push(userId);
    await solution.save();
    res.status(200).json({ success: true, message: "Upvoted successfully" });
  }
});

export const deleteSolution = catchAsyncError(async (req, res, next) => {
  const solution = await Solution.findById(req.params.solutionId);

  if (!solution) return next(new ErrorHandler("Solution not found", 404));

  if (solution.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized to delete this solution", 403));
  }

  await Solution.findByIdAndDelete(req.params.solutionId);

  res.status(200).json({
    success: true,
    message: "Solution deleted successfully",
  });
});
