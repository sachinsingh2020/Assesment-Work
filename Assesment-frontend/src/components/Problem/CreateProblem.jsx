// components/Problem/CreateProblem.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProblem } from '../../redux/actions/problem';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader'; // ✅ import Loader

const CreateProblem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.problem); // ✅ get loading state

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.location) {
      alert('Please fill in all required fields.');
      return;
    }

    const problemData = new FormData();
    problemData.append('title', formData.title);
    problemData.append('description', formData.description);
    problemData.append('location', formData.location);
    if (formData.image) {
      problemData.append('image', formData.image);
    }

    await dispatch(createProblem(problemData));
    navigate('/problem');
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        You must be logged in to create a problem.
      </div>
    );
  }

  // ✅ Show loader while submitting
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 mt-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title*</label>
          <input
            type="text"
            name="title"
            placeholder="Enter problem title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description*</label>
          <textarea
            name="description"
            placeholder="Describe the issue..."
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded h-28"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location*</label>
          <input
            type="text"
            name="location"
            placeholder="Enter problem location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full mt-2 h-52 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Problem
        </button>
      </form>
    </div>
  );
};

export default CreateProblem;
