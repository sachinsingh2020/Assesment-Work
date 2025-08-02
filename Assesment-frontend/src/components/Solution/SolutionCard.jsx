import React from 'react';
import { ThumbsUp, Trash2 } from 'lucide-react';

const SolutionCard = ({ solution, userId, handleUpvote, handleDelete }) => {
  return (
    <div className="bg-gray-50 border p-4 rounded-lg shadow mb-4">
      <p className="text-gray-800 mb-2">{solution.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>By: {solution.user?.fullName || 'Anonymous'}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleUpvote(solution._id)}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
          >
            <ThumbsUp size={16} /> {solution.upvotes?.length || 0}
          </button>
          {userId === solution.user?._id && (
            <button
              onClick={() => handleDelete(solution._id)}
              className="flex items-center gap-1 text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;
