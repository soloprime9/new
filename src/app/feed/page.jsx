"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { decode as jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";



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
              <img src={post?.userId?.profilePic || "/1.jpg"} alt="User" className="w-10 h-10 rounded-full mr-3 cursor-pointer" />
              <h2 className="text-xl font-semibold cursor-pointer"><Link href={"/profile/" + solo.username}> {solo.username || "Unknown User"}</Link></h2>
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



