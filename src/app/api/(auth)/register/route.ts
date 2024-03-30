import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { registerUserSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { setCookie } from "@/utils/generateToken";

/**
 * @method  POST
 * @route   ~/api/register
 * @desc    Create New Account [ (register) || (sign-up) || (إنشاء حساب) ]
 * @access  public
 */


export async function POST(request: NextRequest){
    try {
        const body = await request.json() as RegisterUserDto;
        const validation = registerUserSchema.safeParse(body);

        if(!validation.success){
            return NextResponse.json(
                {message: validation.error.errors[0].message},
                {status: 400}
            );
        }

        const user = await prisma.user.findUnique({where:{email: body.email}});
        if(user){
            return NextResponse.json(
                { message: 'This User is already registered' },
                { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const newUser = await prisma.user.create({
            data:{
                username: body.username,
                email: body.email,
                password: hashedPassword
            },
            select:{
                username: true,
                id: true,
                isAdmin: true
            }
        })

        const cookie = setCookie({
            id: newUser.id,
            username: newUser.username,
            isAdmin: newUser.isAdmin
        });

        return NextResponse.json(
            {...newUser, message: "Registered & Authenticated"}, 
            { 
                status:201,
                headers:{ "Set-Cookie": cookie } 
            });
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}