import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const UserSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Enter a valid email address').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        role: yup.string(),
    })

    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(UserSchema)
    });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/register`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 201) {
                toast.success(res.data.message);
                navigate('/');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            toast.error(errorMessage);
            console.error("Registration error:", errorMessage);
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Create an Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                id="name"
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Enter a valid email address',
                                    },
                                })}
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                {...register('role')}
                                id="role"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-gray-700"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
