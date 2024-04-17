import Link from "next/link";

interface PaginationProps{
  pages: number,
  pageNumber: number,
  route: string
}

const Pagination = ({pages, pageNumber, route}: PaginationProps) => {
  let pagesArray:number[] = [];
  for(let i = 1; i <= pages; i++){
    pagesArray.push(i);
  }

  return (
    <div className='flex justify-center items-center mt-2 mb-10'>
      {pageNumber !== 1 && (

        <Link href={`${route}?pageNumber=${pageNumber-1}`} className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
            Prev
        </Link>
      )}

      {pagesArray.map(page=>
      <Link href={`${route}?pageNumber=${page}`} className={`${pageNumber === page ? "bg-gray-500" : ""} border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}>
          {page}
      </Link>
      )}

      {pageNumber !== pages && (
        <Link href={`${route}?pageNumber=${pageNumber+1}`} className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
            Next
        </Link>
      )}
    </div>
  )
}

export default Pagination