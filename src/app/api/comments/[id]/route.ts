import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from "@/utils/dtos";

interface Props{
    params: {id: string}
}

/**
 * @method  PUT
 * @route   ~/api/comments/:id
 * @desc    Update Comment By Id
 * @access  private (only the writer of this comment)
 */
export async function PUT(request: NextRequest, {params}: Props){
    try {
        const comment = await prisma.comment.findUnique({
            where: {id: parseInt(params.id)}
        });

        if(!comment){
            return NextResponse.json(
                {message: 'This Comment Is Not Found'},
                {status: 404}
            )
        }

        const user = verifyToken(request);
        if(user === null || user.id !== comment.userId){
            return NextResponse.json(
                {message: 'You Are Not Allowed'},
                {status: 403}
            )
        }

        const body = await request.json() as UpdateCommentDto;
        const updatedComment = await prisma.comment.update({
            where: {id: parseInt(params.id)},
            data: {
                text: body.text
            }
        });

        return NextResponse.json(updatedComment,{status: 200});

    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}



/**
 * @method  DELETE
 * @route   ~/api/comments/:id
 * @desc    Delete Comment By Id
 * @access  private (only Admin or the writer of this comment)
 */
export async function DELETE(request: NextRequest, {params}: Props){
    try {
        const comment = await prisma.comment.findUnique({
            where: {id: parseInt(params.id)}
        });

        if(!comment){
            return NextResponse.json(
                {message: 'This Comment Is Not Found'},
                {status: 404}
            )
        }

        const user = verifyToken(request);
        if(user === null){
            return NextResponse.json(
                {message: 'No Token Provided, Access Denied'},
                {status: 401}
            )
        }

        if(user.isAdmin || user.id === comment.userId){
            await prisma.comment.delete({
                where: {id: parseInt(params.id)}
            });

            return NextResponse.json(
                {message: 'Comment Deleted Successfully'},
                {status: 200}
            )
        }

        // In case of user not admin, and not the writer of the comment
        return NextResponse.json(
            {message: 'You Are Not Allowed'},
            {status: 403}
        )
    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}