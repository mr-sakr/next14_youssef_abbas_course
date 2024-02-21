import { Article } from "@/utils/types";

interface SingleArticelPageProps{
    params:{ id:string }
}

const SingleArticelPage = async ({params}:SingleArticelPageProps) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    if(!response.ok){
        throw new Error('Failed To Fetch Article Details');
    }
    const article: Article = await response.json();

  return (
    <section className="min-h-[calc(100vh-150px)] container m-auto w-full px-5 pt-8 md:w-3/4">
        <div className="bg-white p-7 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-700 mb-2">{article.title}</h1>
            <div className="text-gray-400">1/1/2024</div>
            <p className="text-gray-800 text-xl mt-5">{article.body}</p>
        </div>
    </section>
  )
}

export default SingleArticelPage