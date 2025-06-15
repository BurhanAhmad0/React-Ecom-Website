import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';
import PageLoader from '../components/PageLoader';

const Profile = () => {

    const navigate = useNavigate()
    const { user, setUser, loading } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);
    const [IsEditing, setIsEditing] = useState(false)
    const [UplaodImageHover, setUplaodImageHover] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm();

    const onSubmit = async (data) => {

        const originalUser = { ...user };

        setUser((prevUser) => ({
            ...prevUser,
            name: data.name,
            email: data.email,
            user_role: data.role,
        }));
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_BASE}/user/${user.userId}`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status >= 200 && res.status < 300) {
                setIsEditing(false)
                toast.success(res.data?.message || 'Profile updated successfully');
                navigate(`/profile/${user.name.split(' ')[0]}`);
            }
        } catch (err) {
            setUser(originalUser)
            const errorMessage = err.response?.data?.message || err.message;
            toast.error(errorMessage);
            console.error("Update error:", errorMessage);
        }
    }

    const handleProfileImageUpload = async (e) => {
        try {
            const file = e.target.files[0];

            const formData = new FormData();
            formData.append('image', file); // 'image' should match backend field name

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE}/upload/profile_picture`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            toast.success('Image updated successfully!')
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BASE}/user/${user.userId}`, {
                withCredentials: true, // if you use cookies/session
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                // Optionally: redirect or update UI
                navigate('/login')
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
            console.error('Delete user error:', errorMessage);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p className="mt-2 text-gray-700">Are you sure you want to delete your account?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={() => {
                                    setShowConfirm(false);
                                    handleDelete();
                                }}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-10">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* User Avatar */}
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        !user.profile_image ? (
                            <div onMouseEnter={() => setUplaodImageHover(true)} onMouseLeave={() => setUplaodImageHover(false)} className="relative w-32 h-32 rounded-full bg-blue-200 overflow-hidden p-7">
                                <img
                                    loading='lazy'
                                    src="/src/assets/icons/userSvg.svg"
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />

                                <div className={`overlay cursor-pointer w-full h-full rounded-full bg-black/25 absolute top-0 left-0 z-10 ${UplaodImageHover ? 'flex' : 'hidden'} items-center justify-center`}>
                                    <img onClick={() => {
                                        document.getElementById('profile_picture').click(); // open file dialog
                                    }} className='w-12 h-12 opacity-70' src="/src/assets/icons/camera.svg" alt="" />
                                </div>

                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    id="profile_picture"
                                    name="profile_picture"
                                    className="hidden"
                                    onChange={(e) => handleProfileImageUpload(e)}
                                />
                            </div>
                        ) : (
                            <div onMouseEnter={() => setUplaodImageHover(true)} onMouseLeave={() => setUplaodImageHover(false)} className="relative w-32 h-32 rounded-full overflow-hidden">
                                <img
                                    loading='lazy'
                                    src={user.profile_image}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />

                                {/* Overlay Clicks: If file selected, upload; else open file input */}
                                <div
                                    className={`overlay cursor-pointer w-full h-full rounded-full bg-black/25 absolute top-0 left-0 z-10 ${UplaodImageHover ? 'flex' : 'hidden'} items-center justify-center`}
                                    onClick={() => {
                                        document.getElementById('profile_picture').click(); // open file dialog
                                    }}
                                >
                                    <img className="w-12 h-12 opacity-70" src="/src/assets/icons/camera.svg" alt="Upload" />
                                </div>

                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    id="profile_picture"
                                    name="profile_picture"
                                    className="hidden"
                                    onChange={(e) => handleProfileImageUpload(e)}
                                />

                            </div>
                        )
                    )}

                    {/* User Info */}
                    <div className="flex-1">
                        {!IsEditing ? (
                            loading ? (
                                <PageLoader />
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <h2 className="text-gray-600 text-sm">Full Name</h2>
                                            <p className="text-gray-900 font-medium">{user.name}</p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-600 text-sm">Email</h2>
                                            <p className="text-gray-900 font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-600 text-sm">Role</h2>
                                            <p className="text-gray-900 font-medium">{user.user_role}</p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-600 text-sm">Member Since</h2>
                                            <p className="text-gray-900 font-medium">
                                                {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-4">
                                        <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer">
                                            Edit Profile
                                        </button>
                                        <button onClick={() => setShowConfirm(true)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer">
                                            Delete Account
                                        </button>
                                    </div>
                                </>
                            )
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="max-w-2xl mx-auto bg-white p-6 sm:p-8 space-y-6"
                            >

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Upload profile picture
                                    </label>
                                    <input
                                        {...register('profile_picture')}
                                        type="file"
                                        id="profile_picture"
                                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.profile_picture && <p className="text-red-500 text-sm mt-1">{errors.profile_picture.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        id="name"
                                        defaultValue={user?.name}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        {...register('email', {
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        defaultValue={user?.email}
                                        type="email"
                                        id="email"
                                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password <span className="text-xs text-gray-400">(Leave blank to keep current)</span>
                                    </label>
                                    <input
                                        {...register('password', {
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters',
                                            },
                                        })}
                                        type="password"
                                        id="password"
                                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <select
                                        {...register('role', { required: 'Role is required' })}
                                        id="role"
                                        defaultValue={user?.user_role}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300 disabled:opacity-60"
                                >
                                    Update Profile
                                    {isLoading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
