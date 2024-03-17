import { z } from "zod";

// Validation
export const createArticleSchema = z.object({
    title: z.string({
        required_error: 'The Title Is Required',
        invalid_type_error: 'The Title should be of type string'
    }).min(2, {message: 'Title should be at least 2 characters long'}).max(200, {message: 'Title should be less than 200 characters'}),
    description: z.string().min(10),
});
