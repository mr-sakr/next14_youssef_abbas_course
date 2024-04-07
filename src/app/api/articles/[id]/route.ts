import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/utils/dtos";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props{
    params:{ id:string }
}

/**
 * @method  GET
 * @route   ~/api/articles/:id
 * @desc    Get Single Article By Id
 * @access  public
*/

export async function GET(request: NextRequest, {params} : Props){
    try {
        const article = await prisma.article.findUnique({
            where:{id: parseInt(params.id)},
            include:{
                comments:{
                    orderBy:{
                        createdAt: 'desc'
                    },
                    include:{
                        user:{
                            select:{
                                username: true
                            }
                        }
                    }
                }
            }
        });
        if(!article){
            return NextResponse.json({message: 'This Article Is Not Found'}, {status: 404});
        }
    
        return NextResponse.json(article, {status:200});
    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}



/**
 * @method  PUT
 * @route   ~/api/articles/:id
 * @desc    Update Single Article By Id
 * @access  private (only admin can update article)
  */

export async function PUT(request: NextRequest, {params}: Props){
    try {
        const user = verifyToken(request);
        if(user === null || user.isAdmin === false){
            return NextResponse.json(
                {message: 'Only Admin Can Create Article'},
                {status: 403}
            )
        }

        const article = await prisma.article.findUnique({
            where:{ id:parseInt(params.id)}
        });
        if(!article){
            return NextResponse.json({message: 'Article Is Not Found'}, {status: 404});
        }

        const body = await request.json() as UpdateArticleDto;
        const updatedArticle = await prisma.article.update({
            where: {id: parseInt(params.id)},
            data:{
                title: body.title,
                description: body.description
            }
        });

        return NextResponse.json(updatedArticle, {status:200});
    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}


/**
 * @method  DELETE
 * @route   ~/api/articles/:id
 * @desc    Delete Single Article By Id
 * @access  private (only admin can delete article)
 */

export async function DELETE(request: NextRequest, {params}:Props){
    try {
        const user = verifyToken(request);
        if(user === null || user.isAdmin === false){
            return NextResponse.json(
                {message: 'Only Admin Can Create Article'},
                {status: 403}
            )
        }

        const article = await prisma.article.findUnique({
            where: {id: parseInt(params.id)}
        });
        if(!article){
            return NextResponse.json({message: 'Article Is Not Found'}, {status: 404});
        }
        await prisma.article.delete({where:{id: parseInt(params.id)}});
        return NextResponse.json({message: 'Article Was Deleted Successfully'}, {status:200});
    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}