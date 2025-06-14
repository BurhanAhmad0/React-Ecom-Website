import React from 'react';

const About = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="w-full h-80 md:h-full">
          <img
            src="/assets/bgImg.webp"
            alt="About Us"
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Text Section */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
            Welcome to our platform! We are passionate about delivering high-quality digital products and services that enhance your experience. Whether you're here to shop, explore, or learn more about what we offer — our goal is to make it seamless, responsive, and visually appealing.
          </p>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Our team is dedicated to innovation and user satisfaction. We believe in clean design, fast performance, and continuous improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
