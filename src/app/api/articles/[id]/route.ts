import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/utils/data";
import { UpdateArticleDto } from "@/utils/dtos";

interface Props{
    params:{ id:string }
}

/**
 * @method  GET
 * @route   ~/api/articles/:id
 * @desc    Get Single Article By Id
 * @access  public
*/

export function GET(request: NextRequest, {params} : Props){
    const article = articles.find(a => a.id === parseInt(params.id));

    if(!article){
        return NextResponse.json({message: 'This Article Is Not Found'}, {status: 404});
    }

    return NextResponse.json(article, {status:200});
}



/**
 * @method  PUT
 * @route   ~/api/articles/:id
 * @desc    Update Single Article By Id
 * @access  public
  */

export async function PUT(request: NextRequest, {params}: Props){
    const article = articles.find(a => a.id === parseInt(params.id));
    if(!article){
        return NextResponse.json({message: 'Article Is Not Found'}, {status: 404});
    }

    const body = await request.json() as UpdateArticleDto;
    console.log(body);
    
    return NextResponse.json({message: 'Article Was Updated'}, {status:200});
}


/**
 * @method  DELETE
 * @route   ~/api/articles/:id
 * @desc    Delete Single Article By Id
 * @access  public
 */

export function DELETE(request: NextRequest, {params}:Props){
    const article = articles.find(a => a.id === parseInt(params.id));
    if(!article){
        return NextResponse.json({message: 'Article Is Not Found'}, {status: 404});
    }

    return NextResponse.json({message: 'Article Was Deleted Successfully'}, {status:200});
}