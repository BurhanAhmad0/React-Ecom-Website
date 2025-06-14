import React from 'react'

const NewsLetterSection = () => {
    return (
        <section className="bg-gray-100 py-36 px-4 sm:px-6 lg:px-10">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-600 mb-8 text-base sm:text-lg">
                    Stay updated with the latest news and exclusive offers.
                </p>

                {/* Subscription Form */}
                <form className="flex flex-col sm:flex-row justify-center items-stretch gap-3 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        aria-label="Email Address"
                        placeholder="Enter your email"
                        className="w-full sm:w-[300px] px-4 py-3 text-sm border border-gray-300 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md sm:rounded-l-none hover:bg-blue-700 transition-colors duration-300"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    )
}

export default NewsLetterSection
