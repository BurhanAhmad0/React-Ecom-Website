import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>

                <p className="text-sm">
                    Follow us on:{' '}
                    <Link
                        to="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 transition mx-1"
                    >
                        Twitter
                    </Link>
                    ,
                    <Link
                        to="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 transition mx-1"
                    >
                        Facebook
                    </Link>
                    ,
                    <Link
                        to="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-700 transition mx-1"
                    >
                        Instagram
                    </Link>
                </p>
            </div>
        </footer>
    )
}

export default Footer
