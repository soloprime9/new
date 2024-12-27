// 'use client';
// import axios from 'axios';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { FaCheck, FaEarthAsia } from 'react-icons/fa6';
// import { Icons } from 'react-toastify';

// const Profile = () => {
//   const [Profile, setProfile] = useState(null); 
//   const [userId, setuserId] = useState("");
//   const [error, setError] = useState(null);
//   const [follow, setfollow] = useState(null);
 

//   useEffect(() => {
//     const path = window.location.pathname;
//     const username = path.split('/').pop();
//     const token = localStorage.getItem('token');

//     axios.get(`http://localhost:4000/user/${username}`, {
//       headers: {
//         'x-auth-token': token
//     }
//     })
//     .then((result) => {
//       setProfile(result.data.Profile);

      
//       console.log(result.data);
//     })
//     .catch((err) => {
//       setError(err.message);
//       console.log(err);
//     });


    

//   }, []);

 

//   if (error) return <div className='m-10 font-bold text-3xl border-2 rounded w-44 text-center'>User Prifle Not Found</div>;
//   if (!Profile) return <div>Loading...</div>;


//   const { user, posts, Owner} = Profile;
//   return (
    
//     <div>

//       {
//       user ? ( 
//         <div key={user._id}>
//           <h1>{user.username}</h1>
//           <h2>{user.followers.length}</h2>
//           <h2>{user.followings.length}</h2>
//           <h2>{user.bio}</h2>
//           <h2>{user.email}</h2>
//           <h2>{user.password}</h2>
//           <h2>UserId: {user._id}</h2>
          
//         </div>
//       ) : ( <div>ddg</div>)}
    
//     <div className='m-10'> Posts: 
      
//     {posts.length > 0 ? (
//           posts.map((post, index) => (
//             <div key={index} style={{ marginBottom: "20px" }}>
//               <video
//                 src={post.imageUrl}
//                 autoPlay
//                 controls
//                 muted
//                 alt="Post"
//                 style={{ maxWidth: "300px", display: "block" }}
//               />
//                {/* <img
//                 src={post.imageUrl}
                
//                 alt="Post"
//                 style={{ maxWidth: "300px", display: "block" }}
//               /> */}
//               <p>{post.caption}</p>
//             </div>
//           ))
//         ) : (
//           <p>No posts yet.</p>
//         )}

//     </div>

//   </div>
  
  
//   )
// };

// export default Profile;






// 'use client';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Profile = () => {
//   const [Profile, setProfile] = useState(null);
//   const [error, setError] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false); // For follow/unfollow button

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const path = window.location.pathname;
//       const username = path.split('/').pop();
//       const token = localStorage.getItem('token');

//       try {
//         const result = await axios.get(`http://localhost:4000/user/${username}`, {
//           headers: {
//             'x-auth-token': token,
//           },
//         });
//         setProfile(result.data.Profile);

//         // Check if the logged-in user is already following
//         const loggedUserId = JSON.parse(atob(token.split('.')[1])).userid; // Decode JWT to get logged-in user ID
//         setIsFollowing(result.data.Profile.user.followers.includes(loggedUserId));
//       } catch (err) {
//         setError(err.message);
//         console.log(err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleFollow = async () => {
//     const token = localStorage.getItem('token');
//     const loggedUserId = JSON.parse(atob(token.split('.')[1])).userid;

//     if (!token) return alert('You must be logged in to follow users!');

//     try {
//       setLoading(true);
//       const result = await axios.post(
//         `http://localhost:4000/user/follow/${Profile.user._id}`,
//         {},
//         {
//           headers: {
//             'x-auth-token': token,
//           },
//         }
//       );

//       // Update UI based on response
//       setIsFollowing(!isFollowing);
//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         user: {
//           ...prevProfile.user,
//           followers: isFollowing
//             ? prevProfile.user.followers.filter((id) => id !== loggedUserId)
//             : [...prevProfile.user.followers, loggedUserId],
//         },
//       }));
//     } catch (err) {
//       console.error(err);
//       alert('Error following the user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (error) return <div className='m-10 font-bold text-3xl border-2 rounded w-44 text-center'>User Profile Not Found</div>;
//   if (!Profile) return <div>Loading...</div>;

//   const { user, posts } = Profile;

//   return (
//     <div>
//       {user ? (
//         <div key={user._id}>
//           <h1>{user.username}</h1>
//           <h2>Followers: {user.followers.length}</h2>
//           <h2>Following: {user.followings.length}</h2>
//           <h2>{user.bio}</h2>
//           <h2>{user.email}</h2>
//           <h2>UserId: {user._id}</h2>

//           {/* Follow/Unfollow Button */}
//           <button
//             onClick={handleFollow}
//             className={`mt-4 px-4 py-2 rounded text-white ${isFollowing ? 'bg-red-500' : 'bg-blue-500'}`}
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : isFollowing ? 'Unfollow' : 'Follow'}
//           </button>
//         </div>
//       ) : (
//         <div>No user data available</div>
//       )}

//       <div className='m-10'>
//         Posts:
//         {posts.length > 0 ? (
//           posts.map((post, index) => (
//             <div key={index} style={{ marginBottom: '20px' }}>
//               <video
//                 src={post.imageUrl}
//                 autoPlay
//                 controls
//                 muted
//                 alt='Post'
//                 style={{ maxWidth: '300px', display: 'block' }}
//               />
//               <p>{post.caption}</p>
//             </div>
//           ))
//         ) : (
//           <p>No posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;




// 'use client';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Profile = () => {
//   const [Profile, setProfile] = useState(null);
//   const [error, setError] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false); 

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const path = window.location.pathname;
//       const username = path.split('/').pop();
//       const token = localStorage.getItem('token');

//       try {
//         const result = await axios.get(`http://localhost:4000/user/${username}`, {
//           headers: {
//             'x-auth-token': token,
//           },
//         });
//         setProfile(result.data.Profile);

//         const loggedUserId = JSON.parse(atob(token.split('.')[1])).userid; 
//         setIsFollowing(result.data.Profile.user.followers.includes(loggedUserId));
//       } catch (err) {
//         setError(err.message);
//         console.log(err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleFollow = async () => {
//     const token = localStorage.getItem('token');
//     const loggedUserId = JSON.parse(atob(token.split('.')[1])).userid;

//     if (!token) return alert('You must be logged in to follow users!');

//     try {
//       setLoading(true);
//       const result = await axios.post(
//         `http://localhost:4000/user/follow/${Profile.user._id}`,
//         {},
//         {
//           headers: {
//             'x-auth-token': token,
//           },
//         }
//       );

//       setIsFollowing(!isFollowing);
//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         user: {
//           ...prevProfile.user,
//           followers: isFollowing
//             ? prevProfile.user.followers.filter((id) => id !== loggedUserId)
//             : [...prevProfile.user.followers, loggedUserId],
//         },
//       }));
//     } catch (err) {
//       console.error(err);
//       alert('Error following the user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (error) return (
//     <div className="flex justify-center items-center h-screen">
//       <h1 className="text-3xl font-bold">User Profile Not Found</h1>
//     </div>
//   );
//   if (!Profile) return (
//     <div className="flex justify-center items-center h-screen">
//       <h1 className="text-3xl font-bold">Loading...</h1>
//     </div>
//   );

//   const { user, posts } = Profile;

//   return (
//     <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center">
//           <img src={user.profilePicture || "/1.jpg"} alt="Profile Picture" className="w-12 h-12 rounded-full mr-4" />
//           <h1 className="text-2xl font-bold">{user.username}</h1>
//         </div>
//         <div className="flex items-center">
//           <span className="text-lg font-bold mr-4">{user.followers.length} Followers</span>
//           <span className="text-lg font-bold mr-4">{user.followings.length} Following</span>
//           <button
//             onClick={handleFollow}
//             className={`px-4 py-2 rounded text-white ${isFollowing ? 'bg-red-500' : 'bg-blue-500'}`}
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : isFollowing ? 'Unfollow' : 'Follow'}
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {posts.length > 0 ? (
//           posts.map((post, index) => (
//             <div key={index} className="rounded shadow-md">
//               {post.imageUrl.endsWith('.mp4') ? 
              
//               (<video
//                 src={post.imageUrl}
//                 autoPlay
//                 controls
//                 muted
//                 alt="Post"
//                 className="w-full h-full object-cover"
//               />
//             )
//               :(
//                 <img
//                 src={post.imageUrl}
//                 autoPlay
//                 controls
//                 muted
//                 alt="Post"
//                 className="w-full h-full object-cover"
//               />
//               )
// }
//               <p className="p-4 text-lg font-bold">{post.caption}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-lg font-bold">No posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;




'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [Profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false); // New state for owner check

  useEffect(() => {
    const fetchProfile = async () => {
      const path = window.location.pathname;
      const username = path.split('/').pop();
      const token = localStorage.getItem('token');

      try {
        const result = await axios.get(`http://localhost:4000/user/${username}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setProfile(result.data.Profile);

        const loggedUserId = JSON.parse(atob(token.split('.')[1])).userid;
        setIsFollowing(result.data.Profile.user.followers.includes(loggedUserId));
        setIsOwner(result.data.Profile.user._id === loggedUserId); // Check if logged-in user is the profile owner
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleFollow = async () => {
    const token = localStorage.getItem('token');
    const loggedUserId = JSON.parse(atob(token.split('.')[1])).userid;

    if (!token) return alert('You must be logged in to follow users!');

    try {
      setLoading(true);
      const result = await axios.post(
        `http://localhost:4000/user/follow/${Profile.user._id}`,
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      setIsFollowing(!isFollowing);
      setProfile((prevProfile) => ({
        ...prevProfile,
        user: {
          ...prevProfile.user,
          followers: isFollowing
            ? prevProfile.user.followers.filter((id) => id !== loggedUserId)
            : [...prevProfile.user.followers, loggedUserId],
        },
      }));
    } catch (err) {
      console.error(err);
      alert('Error following the user');
    } finally {
      setLoading(false);
    }
  };

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">User Profile Not Found</h1>
    </div>
  );
  if (!Profile) return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Loading...</h1>
    </div>
  );

  const { user, posts } = Profile;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img src={user.profilePicture || "/1.jpg"} alt="Profile Picture" className="w-12 h-12 rounded-full mr-4" />
          <h1 className="text-2xl font-bold">{user.username}</h1>

        </div>
        
        <div className="flex items-center">
          
          <span className="text-lg font-bold mr-4">{user.followers.length} Followers</span>
          <span className="text-lg font-bold mr-4">{user.followings.length} Following</span>
          {isOwner ? (
            <button
              className="px-4 py-2 rounded bg-green-500 text-white"
            >
              <a href={"/" + user.username}>Edit Profile</a>
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`px-4 py-2 rounded text-white ${isFollowing ? 'bg-red-500' : 'bg-blue-500'}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        
      </div>

<div className='flex justify-center font-bold p-5'>{user.bio || "Add about you"} </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-2 rounded p-2">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="rounded shadow-md">
              {post.imageUrl.endsWith('.mp4') ? 
               <video
                src={post.imageUrl}
                autoPlay
                controls
                muted
                alt="Post"
                className="w-full h-full object-cover border-2 rounded"
              /> :
               <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-full object-cover border-2 rounded"
              />}
              <p className="p-4 text-lg font-bold">{post.caption}</p>
            </div>
          ))
        ) : (
          <p className="text-lg font-bold">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
