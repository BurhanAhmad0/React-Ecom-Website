import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext.jsx'
import { useApp } from '../Context/AppContext.jsx';
import { Toaster } from 'react-hot-toast';

const Navbar = ({ bgColor }) => {

    const { user, loading, handleLogout } = useAuth()
    const { cart } = useApp()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const totalCartItems = cart ? cart.reduce(
        (item) => item + 1, // Safely access price
        0
    ) : 0;

    return (
        <nav className={`font-poppins flex items-center justify-between flex-wrap ${bgColor} py-4 px-10 z-10`}>
            <Toaster position="top-right" reverseOrder={false} />
            {/* Brand */}
            <div className="flex items-center flex-shrink-0 text-blue-600 text-2xl font-bold">
                <Link to="/">Exclusive</Link>
            </div>

            {/* Authentication Buttons */}
            {!loading && (
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-4 text-white drop-shadow-md relative">
                                {/* Cart Icon */}
                                <Link to="/cart" className="relative flex items-center justify-center w-9 h-9">
                                    <img loading='lazy' src="https://res.cloudinary.com/dqu9qfaol/image/upload/v1750328544/cartSvg_ok6hnu.svg " alt="Cart" className="w-8 h-8" />
                                    {!(totalCartItems === 0) && <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs rounded-full px-1">{totalCartItems}</span>}
                                </Link>

                                {/* User Icon & Dropdown */}
                                <div className="relative group flex items-center justify-center w-9 h-9">
                                    <img loading='lazy' onClick={() => setIsMenuOpen(!isMenuOpen)} src="https://res.cloudinary.com/dqu9qfaol/image/upload/v1750328513/userSvg_t9drdu.svg" alt="User" className="w-8 h-8 cursor-pointer" />

                                    <div className={`absolute right-0 top-10 mt-2 w-48 text-black bg-white rounded-md shadow-lg z-20 ${isMenuOpen ? 'block' : 'hidden'}`}>
                                        <Link to={`/profile/${user.name.split(' ')[0]}`} className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                        <Link to={`/admin`} className="block px-4 py-2 hover:bg-gray-100">
                                            Admin Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="md:hidden">
                                <button id="menuToggle" className="text-white hover:text-yellow-300 transition text-xl">
                                    ☰
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 cursor-pointer">
                                Login
                            </Link>
                            <Link to="/signup" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition duration-300 cursor-pointer">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
