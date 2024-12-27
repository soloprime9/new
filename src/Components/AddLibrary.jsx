import Library from "@/app/add-library/page";
import axios from "axios";
import { useFormik } from "formik";
import { Result } from "postcss";
import React from "react";
import toast from "react-hot-toast";

const AddLibrary = () => {

    const LibraryForm = useFormik({
        initialValues: {
            name: '',
            description: '',
            github_url : '',
            website_url : '',
            stars : '',
            command: '',
            tags: ''

        },
        onSubmit : values => {
            const Formdata = {
                ...values,
                tags: values.tags.split(',').map((tag) => tag.trim()),
            }
            console.log(Formdata);
            
            axios.post("http://localhost:4000/add", values)
            .then((result) => {
                console.log(result.data);
                alert("Library Added Successfully");
            })
            .catch((error) => {
                console.log(error);
                alert("Failed Library Added");
            })
        }
    })

    return (
        <div className="m-20 justify-center">

            <form onSubmit={LibraryForm.handleSubmit} className="border-2 rounded bg-red-300 p-4">
                <label htmlFor="name">Name</label>

                <input
                type="text"
                id="name"
                name="name" onChange={LibraryForm.handleChange}
                value={LibraryForm.values.name}
                className="border-2 rounded w-full "
                />

                <label htmlFor="command">Command</label>

                <input
                type="text"
                id="command"
                name="command"
                onChange={LibraryForm.handleChange}
                value={LibraryForm.values.command}
                className="border-2 rounded w-full"
                />

                <label htmlFor="tags">Tags</label>

                <input
                type="text" id="tags" name="tags" 
                placeholder=" e.g. Web,iOS"
                onChange={LibraryForm.handleChange} 
                value={LibraryForm.values.tags} className="border-2 rounded w-full"
                />

                <label htmlFor="star">Stars</label>

                <input 
                type="text" 
                id="stars" name="stars" 
                onChange={LibraryForm.handleChange} 
                value={LibraryForm.values.stars} 
                className="border-2 rounded w-full"
                />
                
                <label htmlFor="website">Website Link</label>

                <input 
                type="text" 
                id="website" 
                name="website_url" 
                onChange={LibraryForm.handleChange} 
                value={LibraryForm.values.website_url} 
                className="border-2 rounded w-full"
                />
                
                <label htmlFor="github">Github Link</label>

                <input 
                type="text" 
                id="github" 
                name="github_url" 
                onChange={LibraryForm.handleChange} 
                value={LibraryForm.values.github_url} 
                className="border-2 rounded w-full "
                />

                <label htmlFor="description">Description</label>

                <input 
                type="text" 
                id="description" 
                name="description" 
                onChange={LibraryForm.handleChange} 
                value={LibraryForm.values.description} 
                className="border-2 rounded w-full "
                />

                <div className="mt-5 ">
                <button type="submit" className="border-2 bg-yellow-500 text-black text-lg w-full">Add Library</button>
                </div>
            </form>
            
        </div>
    )
}
export default AddLibrary;