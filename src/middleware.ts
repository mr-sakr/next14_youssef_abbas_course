import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){

    const jwtToken = request.cookies.get('jwtToken');
    const token = jwtToken?.value as string;

    if(!token){
        return NextResponse.json(
            {message: 'Not Token Provided, Access Is Denied'},
            {status: 401} // Unauthorized
        )
    }
}

export const config = {
    matcher: ["/api/profile/:path*"]
}