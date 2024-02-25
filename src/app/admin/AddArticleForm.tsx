"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const formSubmitHandler = (e:React.FormEvent) =>{
        e.preventDefault();

        if(title === "") return toast.error('Title Is Required');
        if(description === "") return toast.error('Description Is Required');
        
        console.log({title, description});
        
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4 border rounded p-2 text-xl" placeholder="Enter Article Title"/>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4 p-2 lg:text-xl rounded resize-none" rows={5} placeholder="Enter Article Discription" ></textarea>
            <button type="submit" className="text-2xl text-white bg-blue-700 p-2 rounded-lg font-bold hover:bg-blue-900">Add</button>
        </form>
    );
};

export default AddArticleForm;
