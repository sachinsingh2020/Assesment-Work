import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProblem, getAllProblems } from '../../redux/actions/problem';
import { logout } from '../../redux/actions/user';
import ProblemCard from './ProblemCard';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader'; // ✅ Import Loader

const AllProblems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { problems, loading, error } = useSelector((state) => state.problem);
  const { user } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getAllProblems());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDeleteProblem = async (problemId) => {
    await dispatch(deleteProblem(problemId));
    await dispatch(getAllProblems());
  };

  const filteredProblems = problems?.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">All Problems</h2>

        <input
          type="text"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-2">
          <button
            onClick={() => navigate('/problem/create')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Create Problem
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔄 Show loader while fetching */}
      {loading && <Loader />}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProblems && filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <ProblemCard
                key={problem._id}
                problem={problem}
                loggedInUserId={user?._id}
                handleDeleteProblem={handleDeleteProblem}
              />
            ))
          ) : (
            <p className="text-gray-600">No matching problems found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProblems;
