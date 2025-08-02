import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';

const ProblemCard = ({ problem, loggedInUserId,handleDeleteProblem }) => {
  const showDelete = loggedInUserId === problem.user._id;

  return (
    <div className="relative group bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300">
      {/* Image */}
      <img
        src={problem.image?.url}
        alt={problem.title}
        className="w-full h-48 object-cover"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-500 flex gap-4">
          <Link to={`/problem/${problem._id}`}>
            <button
              className="bg-white text-blue-600 p-3 rounded-full shadow-md hover:bg-blue-100 transition"
              title="View Details"
            >
              <FaEye size={18} />
            </button>
          </Link>
          {showDelete && (
            <button
              className="bg-white text-red-600 p-3 rounded-full shadow-md hover:bg-red-100 transition"
              title="Delete"
              onClick={()=>handleDeleteProblem(problem._id)}
            >
              <FaTrash size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Text content below the image */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
        <p className="text-gray-600 text-sm mb-1">
          <strong>Location:</strong> {problem.location}
        </p>
        <p className="text-gray-600 text-sm mb-1">
          <strong>Reported by:</strong> {problem.user?.fullName}
        </p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {problem.description}
        </p>
      </div>
    </div>
  );
};

export default ProblemCard;
