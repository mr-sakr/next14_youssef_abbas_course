"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const AddCommentForm = () => {
    const [text, setText] = useState('');

    const formSubmitHandler = (e:React.FormEvent) =>{
        e.preventDefault();
        if(text === '') return toast.error('Please Write Something');
        console.log({setText});
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 rounded-lg text-xl border-none bg-white focus:shadow-md" placeholder="Add Comment"/>
            <button type="submit" className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition">
                Comment
            </button>
        </form>
    );
};

export default AddCommentForm;
