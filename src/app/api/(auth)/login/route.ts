import prisma from "@/utils/db";
import { LoginUserDto } from "@/utils/dtos";
import { loginUserSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { setCookie } from "@/utils/generateToken";

/**
 * @method  POST 
 * @route   ~/api/login
 * @desc    Login User [(Sign-in) (تسجيل دخول)]
 * @access  public
 */

export async function POST(request: NextRequest){
    try {
        const body = await request.json() as LoginUserDto;
        const validation = loginUserSchema.safeParse(body);

        if(!validation.success){
            return NextResponse.json(
                {message: validation.error.errors[0].message},
                {status: 400}
            );
        }

        const user = await prisma.user.findUnique({ where:{email: body.email} });
        
        if(!user){
            return NextResponse.json(
                {message: 'Invalid Email Or Password'},
                {status: 400}
            )
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password);

        if(!isPasswordMatch){
            return NextResponse.json(
                {message: 'Invalid Email Or Password'},
                {status: 400}
            )
        }

        const cookie = setCookie({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        });

        return NextResponse.json(
            {message: 'Authenticated'},
            {
                status: 200,
                headers: {'Set-Cookie' : cookie}
            }
        );

    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}