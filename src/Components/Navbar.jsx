import Link from "next/link";
import React from "react";
import handleSubmit from '../app/signup/page'

const Header = () => {
  handleSubmit == true;



  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-3">
          
          <span className="text-lg font-semibold"><Link href="/">React Libraries</Link></span>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-grow max-w-lg mx-4">
          <div className="relative">
            <button
            
              type="text"
              placeholder="Search libraries..."
              className="w-30 py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            > <a href="/search"> Search</a></button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5a7 7 0 110 14 7 7 0 010-14zm10 10l-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Right Section: Navigation Links */}
        <nav className="flex items-center space-x-6">
          <a
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-white"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-white"
          >
            Explore
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-white"
          >
            About
          </a>
        </nav>

      </div>

   

    </header>

    
  );
};

export default Header;
