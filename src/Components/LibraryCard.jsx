
'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaEarthAsia } from 'react-icons/fa6';

const LibraryCard = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const path = window.location.pathname; 
    const id = path.split('/').pop(); 

    axios.get(`http://localhost:4000/detail/${id}`)
      .then((response) => {
        setUserInfo(response.data);
        console.log(response);
        setErrorMessage(null); 
      })
      .catch((error) => {
        console.log("Error fetching details:", error);
        setErrorMessage("Failed to fetch library details. Please try again.");
      });
  }, []);

  return (
    
    <div>
    {userInfo && Object.keys(userInfo).length > 0 ? (
      <div className="w-full mb-5 py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div className='flex justify-between'> 
          <h1 className='text-3xl font-bold' ><a href={"/detail/" + userInfo._id} className='hover:underline'>{userInfo.name}</a></h1>
          <input type="text" value={userInfo.command} onClick={() => [CopyText(userInfo.command), ] } readOnly className=' rounded text-blue-600 text-center text-2xl font-bold cursor-pointer p-2'/>
        </div>
        <div className='flex space-x-10'>
          {userInfo.tags.map((tag, index) => (
            <div key={index} className='m-3'>
              <button className='border-2 rounded p-1 text-lg'><FaCheck className='inline m-1'/>{tag}</button>
            </div> 
          ))}
        </div>
        <p className='text-lg my-3'>{userInfo.description}</p>
        <div className='flex space-x-10' >
          <p > <a href={userInfo.github_url} target='_blank'> <FaEarthAsia className="inline mr-2" /> Website</a></p>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )}
      </div>
  )
}

export default LibraryCard;