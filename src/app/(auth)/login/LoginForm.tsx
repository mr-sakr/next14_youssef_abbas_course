"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import ButtonSpinner from "@/components/ButtonSpinner";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const formSubmitHandler = async (e:React.FormEvent) =>{
        e.preventDefault();

        if(email === "") return toast.error('Email Is Required');
        if(password === "") return toast.error('Password Is Required');
        
        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/login`, { email, password });
            router.replace('/');
            setLoading(false);
            router.refresh();
        } catch (error:any) {
            setLoading(false);
            return toast.error(error?.response?.data.message);
            console.log(error);
        }
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border rounded p-2 text-xl" placeholder="Enter Your Email"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border rounded p-2 text-xl" placeholder="Enter Your Password"/>
            <button disabled={loading} type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
                {loading ? <ButtonSpinner/> : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;