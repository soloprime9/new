'use client';

import axios from "axios";
import {decode as jwtDecode} from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";



const Feed = ()=> {
    const [post, setPosts] = useState(null);
    const [CommentText, setCommentText] = useState("");
    const [commentBoxOpen, setCommentBoxOpen] = useState({});
    const [userId, setUserId] = useState(null);


    useEffect (() => {
        const token = localStorage.getItem("token");
        if(token){
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.userid);
            }
            catch(error) {
                console.log("Invalid Token", error);
            }
        }

    }, []);

    const fetchPosts = async()=> {
        try{

            const response = await axios.get("http://localhost:4000/post/mango/getall")
            setPosts(response);
        }

        catch(error){
            console.log("Posts Not Fetch",error)

        }
    };

    const HandleLikePost = async(postId) => {
        const token = localStorage.getItem("token");
        try{
            await axios.post(`http://localhost:4000/post/like/${postId}`, {userId}, 
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );
            fetchPosts();
        }
        catch(error){
            console.log("Post not Liked", error);
        }
    };

    const handleComment = async(postId) => {
        const token = localStorage.getItem("token");
        if(!CommentText){
            return alert("Comment Cannot be empty");
        }

        try{
            await axios.post(`http://localhost:4000/post/comment/${postId}`, {CommentText, userId}, {
                headers: {
                    "x-auth-token": token,
                },
            })
            setCommentText("");
        }
        catch(error){
            console.log("Not Commented", error);
        }
    };


    const ToggleCommentBox = (postId) => {
        setCommentBoxOpen((prev) => ({
            ...prev, [postId]:!prev[postId],
        }));
    };

    useEffect (() => {
        fetchPosts();
    }, []);


   
    return
         (
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id}>
                            
                            <div>
                                <img src={post?.userId.profilePicture || "/1.jpg"} alt="" />
                                <h1>{post?.userId?.username || "Unknown User" }</h1>
                            </div>
                            
                            <div>
                                {post.image.endsWith("mp4") ? (
                                    <video src={post.image}></video>
                                ): (
                                    <img src={post.image} alt="" />
                                )}
                            </div>

                            
                            <div>
                                <button onClick={()=> HandleLikePost(post._id)}>{post.likes.length || 0}Like

                                </button>
                                
                                <button onClick={() => ToggleCommentBox(post._id)}>Comment</button>
                            </div>

                                    {commentBoxOpen[post._id] && (
                                        <div className="mt-2">
                                            <input type="text"
                                            value={CommentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Write Comment Here" 
                                            className="w-full p-2 border-2 rounded mb-2" />

                                            <button onClick={() => handleComment(post.id)}
                                               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" >Post Comment</button>

                                        <ul>
                                            {post.comments.map((comment) => (
                                                <li key={comment._id} className="border-2 py-1">
                                                    <strong>{comment.userId?.username || "Unknown"}</strong>
                                                    <p>: {comment.CommentText}</p>

                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                    )}

                        </div>
                    ))
                ): (
                    <div>Not Post Available</div>
                )}
            </div>
            
        )
    


}

export default  Feed;