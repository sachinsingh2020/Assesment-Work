import { Problem } from "../models/problemModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

// POST /api/v1/problems
export const createProblem = catchAsyncError(async (req, res, next) => {
  const { title, description, location } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Title and Description are required", 400));
  }

  const image = req.file;
  const ifImageNotProvidedUrl =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  let fileUri;
  let mycloud;

  if (image) {
    fileUri = getDataUri(image);
    mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  }

  const problem = await Problem.create({
    user: req.user._id,
    title,
    description,
    image: image
      ? {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        }
      : {
          public_id: "default_public_id",
          url: ifImageNotProvidedUrl,
        },
    location: location ? location : "Not Provided",
  });

  res.status(201).json({
    success: true,
    message: "Problem posted successfully",
    problem,
  });
});

// GET /api/v1/problems
export const getAllProblems = catchAsyncError(async (req, res) => {
  const problems = await Problem.find().populate("user", "fullName email");
  res.status(200).json({
    success: true,
    problems,
  });
});

// GET /api/v1/problems/:id
export const getSingleProblem = catchAsyncError(async (req, res, next) => {
  const problem = await Problem.findById(req.params.id).populate(
    "user",
    "fullName email"
  );
  if (!problem) return next(new ErrorHandler("Problem not found", 404));

  res.status(200).json({ success: true, problem });
});

// DELETE /api/v1/problems/:id
export const deleteProblem = catchAsyncError(async (req, res, next) => {
  const problem = await Problem.findById(req.params.id);

  if (!problem) return next(new ErrorHandler("Problem not found", 404));

  if (problem.image.public_id !== "default_public_id") {
    await cloudinary.v2.uploader.destroy(problem.image.public_id);
  }
  await Problem.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "Problem deleted successfully" });
});
