'use client';

import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { FaCheck, FaEarthAsia } from "react-icons/fa6";






const SearchBar = () => {
  const [query, setquery] = useState('');
  const [result, setresult] = useState([]);
  const [error, seterror] = useState([]);
  

  useEffect ( () => {
    if (query.trim() === "") {
      seterror(false);
      setresult([]);
      return;
      
    }

    
      axios.get("http://localhost:4000/search", {
        params: { query },
      })
      .then((result) => {
      setresult(result.data);
      // console.log(result.data)
    })

    .catch( (error)=> {
      console.log(error);
      seterror(error);
    })
  }, [query]);

  const handleSearch = (e)=>{
    e.preventDefault();
    setquery(query);
}

  

  const CopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Text Copied ");
   

  }

  return (
    <div className='m-5'>
        <form  className='m-10'>
    
    <div className='justify-center items-center text-center flex'>
    <input type="text"
        value={query}
        placeholder="Search User"
        onChange={(e) => setquery(e.target.value)}
        className="w-full h-50 py-2 pl-10 pr-4 bg-gray-800 text-white  text-2xl font-bold rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> 
<button type="submit" className="w-200 h-50 m-1 py-2 pl-5 pr-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl font-bold" onClick={handleSearch}>Search</button>
</div>
</form>


        {result && result.length > 0 ? (
result.map((user) => (
<div key={user._id} className="w-full mb-5 py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
  <div className='flex justify-between'> 
  <h1 className='text-3xl font-bold' ><Link href={"/detail/" + user._id} className='hover:underline'>{user.name}</Link></h1>

  <input type="text" value={user.command} onClick={() => [CopyText(user.command), ] } readOnly className=' rounded text-blue-600 text-center text-2xl font-bold cursor-pointer p-2'/>
  
</div>
  
  <div className='flex space-x-10'>
  {user.tags.map((tag, index) => (
   
        <div key={index} className='m-3'>
          <button className='border-2 rounded p-1 text-lg'><FaCheck className='inline m-1'/>{tag}</button>
          </div> 
      ))}
      </div>


  <p className='text-lg my-3'>{user.description.substring(0, 40)}...</p>

  <div className='flex space-x-10' >
  <p > <a href={user.github_url} target='_blank'> <FaEarthAsia className="inline mr-2" /> Website</a></p>
  <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
  <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
  <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
</div>
</div>
))
) : (

<div>...</div>

)}

    </div>
)

}

export default SearchBar;