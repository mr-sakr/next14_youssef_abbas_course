import { z } from "zod";

// Create Article Schema
export const createArticleSchema = z.object({
    title: z.string({
        required_error: 'The Title Is Required',
        invalid_type_error: 'The Title should be of type string'
    }).min(2, {message: 'Title should be at least 2 characters long'}).max(200, {message: 'Title should be less than 200 characters'}),
    description: z.string().min(10),
});


// Register User Schema
export const registerUserSchema = z.object({
    username: z.string().min(2).max(100),
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
});


// Login User Schema
export const loginUserSchema = z.object({
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6)
})


// Create Comment Schema
export const createCommentSchema = z.object({
    text: z.string().min(2).max(50),
    articleId: z.number(),
});