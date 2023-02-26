
import joi from 'joi'

export const articleSchema = joi.object({
    title: joi.string().max(1000).required().messages({
        "string.base": "entry should be a string",
        "string.max": "entry should be not exit 1000 character",
        "string.empty": "Title is not allowed to be empty."
    }),
    content: joi.string().required().messages({
        "string.base": "entry should be a string",
        "string.empty": "Content is not allowed to be empty."
    }),
    image: joi.any(),
    created_on: joi.date().max('now').message('Created date should not be greater than now'),
    likes: joi.number().integer().min(0).message('likes should be positive integer')
})