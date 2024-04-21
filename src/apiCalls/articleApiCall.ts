import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

// Get articles based on pageNumber
export async function getArticles(pageNumber: string | undefined) : Promise<Article[]>{
    const response = await fetch(`http://localhost:3000/api/articles?pageNumber=${pageNumber}`);
    if(!response.ok){
        throw new Error("Failed To Fetch Articles");
    }
    return response.json();
}


// Get articles count
export async function getArticlesCount() : Promise<number>{
    const response = await fetch(`http://localhost:3000/api/articles/count`);
    if(!response.ok){
        throw new Error("Failed To get articles count");
    }
    const {count} = await response.json() as {count:number};
    return count;
}


// Get articles based on searchText
export async function getArticlesBasedOnSearch(searchText: string) : Promise<Article[]>{
    const response = await fetch(`http://localhost:3000/api/articles/search?searchText=${searchText}`);
    if(!response.ok){
        throw new Error("Failed To Fetch Articles");
    }
    return response.json();
}


// Get Article By Id
export async function getSingleArticle(articleId: string): Promise<SingleArticle>{
    const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {cache: 'no-store'});
    if(!response.ok){
        throw new Error('Failed To Fetch Article Details');
    }
    return response.json();
}