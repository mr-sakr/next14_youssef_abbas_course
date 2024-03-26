import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const authToken = request.headers.get('authToken') as string;
    if(!authToken){
        return NextResponse.json(
            {message: 'Not Token Provided, Access Is Denied'},
            {status: 401} // Unauthorized
        )
    }
}

export const config = {
    matcher: ["/api/profile/:path*"]
}