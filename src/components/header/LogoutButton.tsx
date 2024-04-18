'use client'
import axios from "axios"
import { DOMAIN } from "@/utils/constants"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"

export default function LogoutButton(){
    const router = useRouter();

    const logoutHandler = async () =>{
        try {
            await axios.get(`${DOMAIN}/api/logout`);
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.warning("Something went wrong");
            console.log(error);
        }
    }
    return(
        <button onClick={logoutHandler} className="bg-gray-700 text-gray-200 px-1 rounded">Logout</button>
    )
}