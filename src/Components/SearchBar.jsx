'use client';

import axios from 'axios';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { FaCheck, FaEarthAsia } from "react-icons/fa6";
import toast from 'react-hot-toast';





const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (query.trim() === "") {
      setLoading(false);
      setResult([]);
      return <Link href="/" />;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:4000/search", {
        params: { query },
      });
      setResult(response.data);
      console.log(response.data)
      return <Link href={`/search?q=${query}`} />;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClearSearch = () => {
    setQuery('');
    setResult([]);
    return <Link href="/" />;
  };

  const CopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Text Copied ");
   

  }

 

  return (
    <div className='m-5'>
        <form onSubmit={handleSubmit} className='m-10'>
    
        <div className='justify-center items-center text-center flex'>
        <input type="text"
            value={query}
            placeholder="Search libraries..."
            onChange={handleInputChange}
            className="w-full h-50 py-2 pl-10 pr-4 bg-gray-800 text-white  text-2xl font-bold rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> 
  <button type="submit" className="w-200 h-50 m-1 py-2 pl-5 pr-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl font-bold">Search</button>
  </div>
  {/* {query !== '' && (
    <button type="button" onClick={handleClearSearch}>
      Clear
    </button>
  )} */}
</form>
        {result && result.length > 0 ? (
result.map((user) => (
<div key={user._id} className="w-full mb-5 py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
  <div className='flex justify-between'> 
  <h1 className='text-3xl font-bold' ><a href={"/detail/" + user._id} className='hover:underline'>{user.name}</a></h1>

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