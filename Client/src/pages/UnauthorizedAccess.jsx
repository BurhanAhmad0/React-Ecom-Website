import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedAccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
                <h1 className="text-5xl font-extrabold text-red-600 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Unauthorized Access</h2>
                <p className="text-gray-600 mb-6">
                    You are not allowed to view this page. Please log in or return to the homepage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200"
                    >
                        Go to Login
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedAccess;
