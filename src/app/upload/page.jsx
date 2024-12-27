'use client';
import React, { useState } from "react";
import axios from "axios";

const UploadPost = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result); // Generate a preview URL
    reader.readAsDataURL(selectedFile); // Reads the file and triggers `onload`
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !caption) {
      setMessage("Please provide both file and caption.");
      return;
    }

    const formData = new FormData();
    formData.append("mediaData", file); // "mediaData" is the field name for the file
    formData.append("caption", caption); // Add caption to the form data

    try {
      const token = localStorage.getItem("token");
      console.log(token.userid);

      const response = await axios.post("http://localhost:4000/post/upload", formData, {
        headers: {
          "x-auth-token": token, // Include the token in the headers for authentication
        },
      });

      setMessage("Post uploaded successfully!");
      console.log("Successfully Uploaded Post: ", response.data);
    } catch (error) {
      setMessage("Yaar Space nahi hai, please 10MB se kam size Upload karo");
      console.log(error);
    }
  };

  return (
    <div className="m-40 border-2 justify-center  bg-blue-700 text-white font-bold rounded p-5">
      <h2 className="text-2xl py-4 text-center">Upload a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="justify-center items-center text-center">
          <label htmlFor="file" className="text-xl my-6">Select Image or Video</label>
          <input type="file" id="file" onChange={handleFileChange}  placeholder="hello" />
        </div>
        {preview && (
          <div style={{ marginTop: "20px" }} className="text-center justify-center items-center">
            {file.type.startsWith("image/") ? (
              <img className="justify-center text-around mr-10"
                src={preview}
                alt="Preview"
                style={{ maxWidth: "300px", display: "block" }}
              />
            ) : (
              <video
                src={preview}
                
                controls
                autoPlay
                muted
                style={{ maxWidth: "300px", display: "block" }}
              />
            )}
          </div>
        )}
        <div className="mt-10 items-around text-lg text-center">
          <label htmlFor="caption" className=" mr-3">Caption</label>
          <input
            type="text"
            className="rounded text-black p-4 text-xl"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
            placeholder=" Enter caption"
          />
        </div>
        <button type="submit" className="w-full border-2 rounded bg-red-600 p-3 mt-3 text-xl font-bold">Upload Post</button>
      </form>
      {message && <p className="text-lg text-center text-red-400 mt-4">{message}</p>}
    </div>
  );
};

export default UploadPost;










