import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import Jwt, { JwtPayload } from 'jsonwebtoken';

interface Props {
    params: { id: string }
}

/**
 * @method  Delete
 * @route   ~/api/profile/:id
 * @desc    Delete Profile
 * @access  private
 */


export async function DELETE(request: NextRequest, {params} : Props){
    try {
        const user = await prisma.user.findUnique({ where: {id: parseInt(params.id)}});
        if(!user){
            return NextResponse.json(
                {message: 'User Not Found'},
                {status: 404}
            )
        }

        const authToken = request.headers.get('authToken') as string;
        const userFromToken = Jwt.verify(authToken, process.env.JWT_SECRET as string) as JwtPayload;

        if(userFromToken.id == user.id){
            await prisma.user.delete({where:{id: parseInt(params.id)}});
            return NextResponse.json(
                {message: 'Your Profile Has Been Deleted Successfully'},
                {status: 200}
            )
        }

        return NextResponse.json(
            {message: 'Only User Can Remove His Profile'},
            {status: 403} // Forbidden
        )

        
    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}