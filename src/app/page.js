'use client';
import LibraryCard from "@/Components/LibraryCard";
import SearchBar from "@/Components/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get("http://localhost:4000/getall", {
      headers: {
        'x-auth-token': token,
      }
    })
    .then((result) => {
      console.log(result.data);
      setDataList(result.data);
    })
    .catch((error) => {
      console.error("Error:", error.response ? error.response.data : error.message);
      setError(error);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
     
     <SearchBar />

      {
        dataList.length > 0 ? (
        <div>
        {
          dataList.map((user) => (
            <div key={user._id} className="m-3 border-2 bg-yellow-500 rounded">
              <h2>{user.name}</h2>
              <h2>{user.description}</h2>
              <a href="{user.github_url}">GitHub Link</a>
            
            <div>

              <button className="border-2 bg-blue-300 text-white m-3"> {user.tags [0]} </button>

              <button className="border-2 bg-blue-300 text-white"> {user.tags[1]} </button>

              <button className="border-2 bg-blue-300 text-white"> {user.tags[2]} </button>
            
              <button className="border-2 bg-blue-300 text-white"> {user.tags[3]} </button>
            
              <button className="border-2 bg-blue-300 text-white"> {user.tags[4]} </button>

            </div>

            <h2>{user.command}</h2>
            <h2>{user.stars}</h2>
            

          </div>
        ))}
        </div>
      ) : ( <div>..Loading </div>)}

      <div className="m-44">
        
      </div>
    </div>
  );
}
