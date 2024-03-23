export type Article = {
    id:number;
    userId:number;
    title:string;
    description:string
}

export type JWTPayload = {
    id: number,
    username: string,
    isAdmin: boolean
}