import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@prisma/client";
import { Metadata } from "next";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import { ARTICLES_PER_PAGE } from "@/utils/constants";

export const metadata:Metadata = {
  title: "Articles Page",
  description: "Articles About Programming",
}

interface ArticlesPageProps{
  searchParams:{ pageNumber : string }
}

const ArticlesPage = async ( {searchParams} : ArticlesPageProps) => {
  const { pageNumber } = searchParams;
  const articles: Article[] = await getArticles(pageNumber);

  const count:number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLES_PER_PAGE);


  return (
    <section className="container m-auto px-5">
      <SearchArticleInput/>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages}/>
    </section>
  );
};

export default ArticlesPage;