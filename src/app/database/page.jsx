"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck, FaEarthAsia } from "react-icons/fa6";

const Database = () => {

    const [allusers, setallusers] = useState([]);
    const [error, seterror] = useState('');

    useEffect(() => {
        axios.get("http://localhost:4000/user/getall")
        .then((result) => {
            // console.log(result.data);
            setallusers(result.data);
        })
        .catch((error) => {
            console.log(error);
            seterror(error);
        })
    })

    return (
    
        <div className="m-20">

        {
            allusers.map((user) => (
                <div key={user._id} className=" flex border-2 bg-blue-500 p-10 font-bold text-4xl justify-between">
                <p>{user._id}</p>
                <p> <a href={"/profile/" + user.username}>{user.username}</a></p>
                <p>{user.email}</p>
                <p>{user.password}</p>
                </div>
            ))
        }
        
          </div>
      )

}

export default Database;