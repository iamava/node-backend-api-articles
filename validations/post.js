import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Please fill the title of article').isLength({ min: 3 }).isString(),
    body('text', 'Please fill the content of article').isLength({ min: 10 }).isString(),
    body('tags', 'Not valid format of tags').optional().isArray(),
    body('imageUrl', 'Not valid image URL').optional().isString(),
];