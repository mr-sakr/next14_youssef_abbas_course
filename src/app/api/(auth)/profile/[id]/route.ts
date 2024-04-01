import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from 'bcryptjs';

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

        const userFromToken = verifyToken(request);

        if(userFromToken !== null && userFromToken.id == user.id){
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



/**
 * @method  GET
 * @route   ~/api/profile/:id
 * @desc    Get Profile By Id
 * @access  private
 */
export async function GET(request : NextRequest, {params} : Props){
    try {
        const user = await prisma.user.findUnique({
            where: {id: parseInt(params.id)},
            select:{
                id: true,
                email: true,
                username: true,
                createdAt: true,
                isAdmin: true
            }
        });

        if(!user){
            return NextResponse.json(
                {message: 'User Not Found'},
                {status: 404}
            )
        }

        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id != user.id){
            return NextResponse.json(
                {message: 'You Are Not Allowed, Access Denied'},
                {status: 403}
            )
        }

        return NextResponse.json(user, {status: 200});

    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}




/**
 * @method  PUT
 * @route   ~/api/profile/:id
 * @desc    Update Profile By Id
 * @access  private
 */
export async function PUT(request : NextRequest, {params} : Props){
    try {
        const user = await prisma.user.findUnique({where: {id: parseInt(params.id)}});

        if(!user){
            return NextResponse.json(
                {message: 'User Not Found'},
                {status: 404}
            )
        }

        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id != user.id){
            return NextResponse.json(
                {message: 'You Are Not Allowed, Access Denied'},
                {status: 403}
            )
        }

        // Code of update user data ....
        const body = await request.json() as UpdateUserDto ;

        if(body.password){
            if(body.password.length < 6){
                return NextResponse.json(
                    {message: 'Password length must be 6 characters at least'},
                    {status: 400}
                )
            }
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }
        const updatedUser = await prisma.user.update({
            where: {id: parseInt(params.id)},
            data:{
                username: body.username,
                email: body.email,
                password: body.password
            }
        });

        const {password, ...other} = updatedUser;
        return NextResponse.json( {...other}, {status: 200});

    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}