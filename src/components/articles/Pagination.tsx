const pages = [1, 2, 3, 4]

const Pagination = () => {
  return (
    <div className='flex justify-center items-center mt-2 mb-10'>
        <div className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
            Prev
        </div>
        {pages.map(item=>
        <div key={item} className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
            {item}
        </div>
        )}
        <div className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
            Next
        </div>
    </div>
  )
}

export default Pagination