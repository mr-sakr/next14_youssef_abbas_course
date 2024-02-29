const articles = [1, 2, 3, 4, 5, 6];

const loading = () => {
  return (
    <section className="container m-auto px-5 animate-pulse">
        <div className="bg-gray-300 animate-pulse h-12 my-5 w-full md:w-2/3 m-auto"></div>

        <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((article)=>(
                <div key={article} className="bg-gray-200 p-5 rounded-lg my-1 w-full md:w-2/5 lg:w-1/4">
                    <h3 className=" bg-gray-300 h-6"></h3>
                    <p className="my-2  bg-gray-300 h-10 p-1"></p>
                    <div className="bg-gray-400 h-8 w-full block text-center rounded-lg"></div>
                </div>
            ))}
            
        </div>
      
      {/* Pagination */}
      <div className="flex justify-center items-center mt-2 mb-10">
        <div className='bg-gray-300 animate-pulse h-9 rounded-sm w-[300px] mt-2 mb-10'></div>
      </div>

    </section>
  )
}

export default loading