'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // JWT decode library import

const ProfileUpdate = () => {
  const { username } = useParams(); // URL se username le rahe hain
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Token se current user ka username
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false); // Authorization status check

  useEffect(() => {
    // Fetch the current authenticated user's username from token
    const fetchCurrentUser = () => {
      const token = localStorage.getItem("token");
              if(token){
                  try {
                      const decoded = jwtDecode(token);
                      setCurrentUser(decoded.username);
                  }
                  catch(error) {
                      console.log("Invalid Token", error);
                  }
              }
    };

    fetchCurrentUser();
  }, [username]); // `username` dependency

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthorized) {
      setErrorMessage('Aapko is profile ko update karne ki ijazat nahi hai.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('bio', bio);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      const token = localStorage.getItem('token'); // Token ko localStorage se fetch karenge
      const response = await axios.put(
        `/update/${username}`, // Backend API ko username ke saath hit karenge
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Token ko header mein bhejenge
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log('Profile update error:', error);
      setErrorMessage(error.response?.data?.error || 'Kuch galat ho gaya.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Profile Update</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {isAuthorized && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bio" className="block font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Update your bio"
            />
          </div>
          <div>
            <label htmlFor="profilePicture" className="block font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleProfilePictureChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileUpdate;
