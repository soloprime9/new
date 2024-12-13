import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const SearchUser = () => {

    const [query, setquery] = useState("");
    const [result, setresult] = useState([]);
    const [error , seterror] = useState([]);

    useEffect( () => {
        if (query.trim() === "") {
            seterror(false);
            setresult([]);
            return;
            
          }

        axios.get("http://localhost:4000/user/database/search", {
            params: {query},
        })
        .then((result) =>{
            setresult(result.data);
            // console.log(result);
        })
        .catch((error) => {
            console.log(error);
            setresult([]);
        })
    },[query] )

    const handleSearch = (e)=>{
        e.preventDefault();
        setquery(query);
    }

  return (

    <div className='m-10'>

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


       

        <div>
            { error ? (
                <div>{error}</div>
            ) :
            
            result && result.length > 0 ?(
                
                result.map((solo) => (
                    <div key={solo._id} className="w-full mb-5 py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <p className='font-bold'><a href={"/profile/" + solo.username}> {solo.username}</a></p>
                        <p>{solo.email}</p>
                        <p>{solo.password}</p>
                    </div>
                )))
                :(
                    <div> {error} </div>
                )
             
            }
     
    </div>
    </div>
  )
}

export default SearchUser;


// import axios from 'axios';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react'

// const SearchUser = () => {

//     const [query, setquery] = useState("");
//     const [result, setresult] = useState([]);
//     const [error, seterror] = useState(null);

//     useEffect(() => {
//         if (query.trim() === "") {
//             setresult([]);
//             seterror(null);
//             return;
//         }

//         axios.get("http://localhost:4000/user/database/search", {
//             params: { query },
//         })
//             .then((result) => {
//                 setresult(result.data);
//                 seterror(null);
//             })
//             .catch((error) => {
//                 setresult([]);
//                 seterror(error.message);
//             })
//     }, [query]);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         setquery(query);
//     };

//     return (

//         <div>
//             <input type="text" value={query} onChange={(e) => setquery(e.target.value)}
//                 className='p-5 border-2 rounded w-auto' />
//             <button type='submit' onClick={handleSearch}>Search</button>

//             <div>
//                 {error ? (
//                     <div>{error}</div>
//                 ) : result.length > 0 ? (
//                     result.map((solo) => (
//                         <div key={solo._id}>
//                             <p>{solo.username}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <div>Loading...</div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default SearchUser;