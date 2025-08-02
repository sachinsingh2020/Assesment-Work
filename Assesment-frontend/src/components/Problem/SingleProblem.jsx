// components/Problem/SingleProblem.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProblem, deleteProblem } from '../../redux/actions/problem';
import {
  getSolutionsForProblem,
  createSolution,
  toggleUpvote,
  deleteSolution,
} from '../../redux/actions/solution';
import Loader from '../common/Loader';
import SolutionCard from '../Solution/SolutionCard';

const SingleProblem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProblem, loading } = useSelector((state) => state.problem);
  const { user } = useSelector((state) => state.user);
  const { solutions, loading: solutionLoading } = useSelector((state) => state.solution);

  const [description,setDescription] = useState("");

  useEffect(() => {
    dispatch(getSingleProblem(id));
    dispatch(getSolutionsForProblem(id));
  }, [dispatch, id]);


const handleSubmitSolution = async (e) => {
  e.preventDefault();

  try {
    await dispatch(createSolution(id, description));
    setDescription('');

    // Optional delay of 500ms
    await new Promise((resolve) => setTimeout(resolve, 500));

    await dispatch(getSolutionsForProblem(id));
  } catch (error) {
    console.error('Error submitting solution:', error);
  }
};

const handleUpvote = async (solutionId) => {
  try {
    await dispatch(toggleUpvote(solutionId));

    // Optional delay of 500ms
    await new Promise((resolve) => setTimeout(resolve, 500));

    await dispatch(getSolutionsForProblem(id));
  } catch (error) {
    console.error('Error upvoting solution:', error);
  }
};


const handleDeleteSolution = async (solutionId) => {
  const confirmed = window.confirm('Delete this solution?');
  if (!confirmed) return;

  try {
    await dispatch(deleteSolution(solutionId));
    await dispatch(getSolutionsForProblem(id));
    await dispatch(getSingleProblem(id));
  } catch (error) {
    console.error('Error deleting solution:', error);
  }
};


  if (loading || !singleProblem) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-4">
      <Link to={'/problem'}>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'>Back</button>
      </Link>
      {singleProblem.image && (
        <img src={singleProblem.image.url} alt="problem" className="w-full h-64 object-cover rounded mb-4" />
      )}
      <h1 className="text-2xl font-bold mb-2">{singleProblem.title}</h1>
      <p className="text-gray-600 mb-2">{singleProblem.description}</p>
      <p className="text-sm text-blue-600 mb-2">📍 Location: {singleProblem.location}</p>
      <p className="text-sm text-gray-500 mb-4">Posted By: {singleProblem.user?.fullName || 'Unknown'}</p>


      {/* Solution Submission */}
      <div className="mt-8 mb-6">
        <h2 className="text-xl font-semibold mb-3">Write a Solution</h2>
        <textarea
          rows="4"
          className="w-full border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring focus:ring-blue-200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Propose your solution..."
        ></textarea>
        <button
          onClick={handleSubmitSolution}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Solution
        </button>
      </div>

      {/* Solutions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Solutions</h2>
        {solutionLoading ? (
          <Loader />
        ) : solutions?.length > 0 ? (
          solutions.map((solution) => (
            <SolutionCard
              key={solution._id}
              solution={solution}
              userId={user?._id}
              handleUpvote={handleUpvote}
              handleDelete={handleDeleteSolution}
            />
          ))
        ) : (
          <p className="text-gray-500">No solutions yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
};

export default SingleProblem;
