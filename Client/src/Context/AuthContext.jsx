// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Create the context
const AuthContext = createContext();

// Custom hook for easier use
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Optional: Check if user is already logged in
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/user', {
                    withCredentials: true
                });
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/logout',
                {}, // POST body is empty
                {
                    withCredentials: true // This should be in the config object
                }
            );

            if (response.status === 201) {
                toast.success(response.data.message);
                navigate('/login'); // Redirect to login page after logout
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    const values = {
        user, setUser,
        loading,
        handleLogout
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};
