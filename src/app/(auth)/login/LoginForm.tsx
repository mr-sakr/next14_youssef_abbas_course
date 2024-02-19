"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formSubmitHandler = (e:React.FormEvent) =>{
        e.preventDefault();

        if(email === "") return toast.error('Email Is Required');
        if(password === "") return toast.error('Password Is Required');
        
        console.log({email, password});
        
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border rounded p-2 text-xl" placeholder="Enter Your Email"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border rounded p-2 text-xl" placeholder="Enter Your Password"/>
            <button type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">Login</button>
        </form>
    );
};

export default LoginForm;
