import Jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export function generateJWT(jwtPayload: JWTPayload) : string {
    const privateKey = process.env.JWT_SECRET as string ;
    const token = Jwt.sign(jwtPayload, privateKey,{
        expiresIn: '30d'
    });

    return token;
}