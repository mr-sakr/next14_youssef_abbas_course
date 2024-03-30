import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @method  GET 
 * @route   ~/api/logout
 * @desc    Logout User [(Sign-out) (تسجيل خروج)]
 * @access  public
 */

export function GET(request: NextRequest){
    try {
        cookies().delete("jwtToken");
        return NextResponse.json(
            {message: 'Logout'},
            {status: 200}
        );
    } catch (error) {
        return NextResponse.json(
            {message: 'Internal Server Error'},
            {status: 500}
        )
    }
}