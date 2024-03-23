import prisma from "@/utils/db";
import { LoginUserDto } from "@/utils/dtos";
import { loginUserSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateJWT } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";

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

        const jwtPayload : JWTPayload = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        }
        const token = generateJWT(jwtPayload)

        return NextResponse.json(
            {message: 'Authenticated', token},
            {status: 200}
        );

    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}