'use client';
import LibraryCard from "@/Components/LibraryCard";
import SearchBar from "@/Components/SearchBar";
import axios from "axios";
import Link from "next/link";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEarthAsia } from "react-icons/fa6";


export default function Home() {
  const [dataList, setDataList] = useState([]);
  const [query, setquery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("http://localhost:4000/getall", {
      headers: {
        'x-auth-token': token,
      }
    })
    .then((dataList) => {
      console.log(dataList.data);
      setDataList(dataList.data);
    })
    .catch((error) => {
      console.log("Error:", error.response ? error.response.data : error.message);
      setError(error);
      return <Link href={"/expired"} />;
    });
  }, []); // Empty dependency array means this effect runs once on mount

  const CopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied");
    
  }
  return (
    <div className="m-10">
     
    <h1 className="text-4xl font-bold text-blue-600 m-5 font-montserrat
">Top Libraries Are Here</h1>

     {dataList && dataList.length > 0 ? (
dataList.map((user) => (
<div key={user._id} className="w-full mb-5 py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
  <div className='flex justify-between'> 
  <h1 className='text-3xl font-bold' ><a href={user.github_url} className='hover:underline'>{user.name}</a></h1>

  <input type="text" value={user.command} onClick={() => [CopyText(user.command) ] } readOnly className=' rounded text-blue-600 text-center text-2xl font-bold cursor-pointer p-2'/>
  
</div>
  
  <div className='flex space-x-10 '>
  {user.tags.map((tag, index) => (
   
        <div key={index} className='m-3'>
          <button className='border-2 rounded p-1 text-lg'><FaCheck className='inline m-1'/>{tag}</button>
          </div> 
      ))} 
      </div>


  <p className='text-lg my-3'>{user.description}</p>

  <div className='flex space-x-10' >
  <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
  <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
  <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
  <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
</div>
</div>
))
) : (  <div>..Loading <br />

    <button className="border-2 p-3 rounded bg-blue-500 text-white font-bold text-xl"><a href="/login/">Token Expired? Generate Another</a></button>

   </div>)}

      <div className="m-44">
       
        
      </div>
    </div>
  );
}
