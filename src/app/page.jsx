// 'use client';
// import LibraryCard from "@/Components/LibraryCard";
// import SearchBar from "@/Components/SearchBar";
// import axios from "axios";
// import Link from "next/link";
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { FaCheck, FaEarthAsia } from "react-icons/fa6";


// export default function Home() {
//   const [dataList, setDataList] = useState([]);
//   const [query, setquery] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     axios.get("http://localhost:4000/getall", {
//       headers: {
//         'x-auth-token': token,
//       }
//     })
//     .then((dataList) => {
//       console.log(dataList.data);
//       setDataList(dataList.data);
//     })
//     .catch((error) => {
//       console.log("Error:", error.response ? error.response.data : error.message);
//       setError(error);
//       return <Link href={"/expired"} />;
//     });
//   }, []); // Empty dependency array means this effect runs once on mount

//   const CopyText = (text) => {
//     navigator.clipboard.writeText(text);
//     toast("Copied");
    
//   }
//   return (
//     <div className="m-10">
     
//     <h1 className="text-4xl font-bold text-blue-600 m-5 font-montserrat
// ">Top Libraries Are Here</h1>

//      {dataList && dataList.length > 0 ? (
// dataList.map((user) => (
// <div key={user._id} className="w-full mb-5 py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
//   <div className='flex justify-between'> 
//   <h1 className='text-3xl font-bold' ><Link href={"/detail/" +user._id} className='hover:underline'>{user.name}</Link></h1>

//   <input type="text" value={user.command} onClick={() => [CopyText(user.command) ] } readOnly className=' rounded text-blue-600 text-center text-2xl font-bold cursor-pointer p-2'/>
  
// </div>
  
//   <div className='flex space-x-10 '>
//   {user.tags.map((tag, index) => (
   
//         <div key={index} className='m-3'>
//           <button className='border-2 rounded p-1 text-lg'><FaCheck className='inline m-1'/>{tag}</button>
//           </div> 
//       ))} 
//       </div>


//   <p className='text-lg my-3'>{user.description}</p>

//   <div className='flex space-x-10' >
//   <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
//   <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
//   <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
//   <p > <a href={user.github_url}> <FaEarthAsia className="inline mr-2" /> Website</a></p>
// </div>
// </div>
// ))
// ) : (  <div>..Loading <br />

//     <button className="border-2 p-3 rounded bg-blue-500 text-white font-bold text-xl"><a href="/login/">Token Expired? Generate Another</a></button>

//    </div>)}

//       <div className="m-44">
       
        
//       </div>
//     </div>
//   );
// }


"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { decode as jwtDecode } from "jwt-decode";



const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [CommentText, setCommentText] = useState("");
  const [commentBoxOpen, setCommentBoxOpen] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userid);
      } catch (err) {
        console.log("Invalid Token:", err);
      }
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/post/mango/getall");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikePost = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://localhost:4000/post/like/${postId}`, {}, {
        headers: {
          "x-auth-token": token,
        },
      });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (postId) => {
    const token = localStorage.getItem("token");
    if (!CommentText.trim()) return alert("Comment cannot be empty");

    try {
      await axios.post(
        `http://localhost:4000/post/comment/${postId}`,
        { CommentText, userId },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setCommentText("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleCommentBox = (postId) => {
    setCommentBoxOpen((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:pr-60 lg:pl-60">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="m-4 border-2 p-2 rounded">
            <div className="flex items-center mb-2">
              <img src={post?.userId?.profilePic || "/1.jpg"} alt="User" className="w-10 h-10 rounded-full mr-3" />
              <h2 className="text-xl font-semibold">{post?.userId?.username || "Unknown User"}</h2>
            </div>
            <div>
              {post.image.endsWith(".mp4") ? (
                <video src={post.image} className="w-full" autoPlay controls muted />
              ) : (
                <img src={post.image} alt="Post" className="w-full" />
              )}
            </div>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleLikePost(post._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Like ({post.likes.length || 0})
              </button>
              <button
                onClick={() => toggleCommentBox(post._id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Comment
              </button>
            </div>
            {commentBoxOpen[post._id] && (
              <div className="mt-2">
                <input
                  type="text"
                  value={CommentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  Post Comment
                </button>
                <ul className="mt-2">
                  {post.comments.map((comment) => (
                    <li key={comment._id} className="border-b py-1">
                      <strong>{comment.userId?.username || "Anonymous"}:</strong> {comment.CommentText}
                      <strong> {comment.likes}</strong>


                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Feed;



