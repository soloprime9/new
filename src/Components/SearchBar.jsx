// 'use client';

// const axios = require("axios");
// const { useState } = require("react");

// const SearchBar = () => {
//     const [query, setquery] = useState("");
//     const [result, setresult] = useState([]);
//     const [error, seterror] = useState(null);
//     const [loading, setloading] = useState(false);


//     const SearchHandle = async () => {
//         if (query.trim() === ""){
//             setloading("Here is the query Empty");
//             return;
//         }

//         seterror(null);
//         setloading(true);

//         try{
//         const response = await axios.get("http://localhost:4000/search", 
//             {
//                 params: {query},
//             });
//             console.log(response.data);
//             setresult(response.data);

//         }
//         catch(error){
//             console.log(error);
//         }

//     };

//     return (
//         <div>
//             <input type="text" value={query} onChange={(e) => setquery(e.target.value)} />
//             <button onClick={SearchHandle}>Search</button>
//             {!loading && result.length === 0 && !error && <p>No libraries found matching your search criteria.</p>}
//             {result && result.length > 0 ? (
//   result.map((user) => (
//     <div key={user._id}>
//       <h1>{user.name}</h1>
//       <h1>{user.description}</h1>
//     </div>
//   ))
// ) : (

//     <div>...</div>
  
// )}

//         </div>
//     )

// }

// export default SearchBar;

// 'use client';

// const axios = require("axios");
// const { useState } = require("react");

// const SearchBar = () => {
//     const [query, setquery] = useState("");
//     const [result, setresult] = useState([]);
//     const [error, seterror] = useState(null);
//     const [loading, setloading] = useState(false);

//     const SearchHandle = async () => {
//         if (query.trim() === "") {
//             seterror("Please enter a search query.");
//             return;
//         }

//         seterror(null);
//         setloading(true);

//         try {
//             const response = await axios.get("http://localhost:4000/search", {
//                 params: { query },
//             });
//             console.log(response.data);
//             setresult(response.data);
//         } catch (error) {
//             console.error(error);
//             seterror("An error occurred while searching. Please try again.");
//         } 
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setquery(e.target.value)}
//                 placeholder="Search libraries..."
//             />
//             <button type="submit" onClick={SearchHandle}>Search</button>

            
//             {error && <p className="text-red-600">{error}</p>}
//             { result.length > 0 ? (
//                 result.map((user) => (
//                     <div key={user._id}>
//                         <h1>{user.name}</h1>
//                         <h1>{user.description}</h1>
//                     </div>
//                 ))
//             ) : (
//                 <div>loading</div>
//             )}
//         </div>
//     );
// };

// export default SearchBar;
'use client';

import axios from 'axios';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (query.trim() === "") {
      setLoading(false);
      setResult([]);
      router.push('/');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:4000/search", {
        params: { query },
      });
      setResult(response.data);
      router.push(`/search?q=${query}`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [query, router]);

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
    router.push('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search libraries..."
        />
        <button type="submit">Search</button>
        {query !== '' && (
          <button type="button" onClick={handleClearSearch}>
            Clear
          </button>
        )}
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : result.length > 0 ? (
        <ul>
          {result.map((library) => (
            <li key={library._id}>
              <h2>{library.name}</h2>
              <p>{library.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No libraries found matching your search criteria.</p>
      )}
    </div>
  );
};

export default SearchBar;