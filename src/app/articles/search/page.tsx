import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";

interface ArticlesSearchPageProps {
  searchParams: { searchText: string };
}

const ArticlesSearchPage = async ({searchParams: { searchText } }: ArticlesSearchPageProps) => {
  const articles: Article[] = await getArticlesBasedOnSearch(searchText);
  return (
    <section className="container m-auto px-5">
      {articles.length == 0 ? (
        <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800 ">
          Articles Based On :
          <span className="text-red-700 text-3xl font-bold mx-1">
            {searchText}
          </span>
          Not Found
        </h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800 ">
            Articles Based On :
            <span className="ms-1 text-green-700 text-3xl font-bold">
              {searchText}
            </span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((item) => (
              <ArticleItem key={item.id} article={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ArticlesSearchPage;