import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { FaCheck, FaEarthAsia } from 'react-icons/fa6';

const Profile = () => {

  const [user, setuser] = useState([]);
  const [error, seterror] = useState([]);

  useEffect (() => {

    const path = window.location.pathname;
    const user = path.split('/').pop();
    const token = localStorage.getItem('token');


    axios.get(`http://localhost:4000/user/${user}`)
    .then((result)=> {
      // console.log(result);
      setuser(result.data);
    })
    .catch((error) => {
      seterror(error);
    })
  })
  

  return (
    
    <div className='m-20 bg-yellow-500 text-white text-2xl font-bold'>

      
  
      <div className="w-full mb-5 py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <p className='font-bold text-3xl'>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.password}</p>
        <p>{user._id}</p>
      </div>
    </div>
  )
};

export default Profile;