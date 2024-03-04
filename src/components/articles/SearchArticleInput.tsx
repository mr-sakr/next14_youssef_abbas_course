"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchArticleInput = () => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const formSubmitHandler = (e:React.FormEvent) =>{
        e.preventDefault();

        console.log({searchText});
        router.push(`/articles/search?text=${searchText}`);
    }

    return (
        <form onSubmit={formSubmitHandler} className="my-5 w-full md:w-2/3 m-auto">
            <input type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-full p-3 rounded text-xl border-none text-gray-900" placeholder="Search For Article"/>
        </form>
    );
};

export default SearchArticleInput;
