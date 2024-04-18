"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import ButtonSpinner from "@/components/ButtonSpinner";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const formSubmitHandler = async (e:React.FormEvent) =>{
        e.preventDefault();

        if(username === "") return toast.error('Username Is Required');
        if(email === "") return toast.error('Email Is Required');
        if(password === "") return toast.error('Password Is Required');
        
        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/register`, { username, email, password });
            router.replace('/');
            setLoading(false);
            router.refresh();
        } catch (error:any) {
            setLoading(false);
            return toast.error(error?.response?.data.message);
            console.log(error);
        }

        console.log({email, username, password});
        
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-4 border rounded p-2 text-xl" placeholder="Enter Your Username"/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border rounded p-2 text-xl" placeholder="Enter Your Email"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border rounded p-2 text-xl" placeholder="Enter Your Password"/>
            <button type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
                {loading ? <ButtonSpinner/> : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;