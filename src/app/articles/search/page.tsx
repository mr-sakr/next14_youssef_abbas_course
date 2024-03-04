interface ArticlesSearchPageProps{
  searchParams:{text: string},
}

const ArticlesSearchPage = ({searchParams}:ArticlesSearchPageProps) => {  
  return (
    <section className="flex justify-center p-5 m-5">
      <h1 className="font-bold mx-2">Search Text Is: </h1>
      <p>{searchParams.text}</p>
    </section>
  )
}

export default ArticlesSearchPage