import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/user';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '+91', // Initialize with +91
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, error, isAuthenticated } = useSelector((state) => state.user);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'phoneNumber' && !value.startsWith('+91')) {
            value = `+91${value.replace(/^\+91/, '')}`; // Ensure +91 is enforced
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!formData.fullName) {
            toast.error('Full Name is required.');
            return false;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Enter a valid email address.');
            return false;
        }
        if (!formData.dateOfBirth || !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dateOfBirth)) {
            toast.error('Enter Date of Birth in MM/DD/YYYY format.');
            return false;
        }
        if (!formData.phoneNumber || !/^\+91\d{10}$/.test(formData.phoneNumber)) {
            toast.error('Enter a valid 10-digit phone number.');
            return false;
        }
        if (!formData.password) {
            toast.error('Password is required.');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const { confirmPassword, ...finalData } = formData;
            await dispatch(register(finalData));
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, message, error, isAuthenticated, navigate]);

   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center">Create an account!</h1>
            <p className="text-gray-600 mb-6 text-center">
                Enter your details below to create an account and get started.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                            type="text"
                            name="dateOfBirth"
                            placeholder="MM / DD / YYYY"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="+91 1234567890"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6 gap-4">
                    <button
                        type="submit"
                        className="w-1/2 bg-[#013421] text-white py-3 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Create account
                    </button>
                    <Link
                        to="/login"
                        className="w-1/2 text-center hover:underline"
                    >
                        Already have an account?{" "}
                        <span className="text-[#f98b03]">Login</span>
                    </Link>
                </div>
            </form>
        </div>
    </div>
);
};

export default Register;
