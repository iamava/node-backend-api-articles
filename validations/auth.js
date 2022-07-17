import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Not valid format').isEmail(),
    body('password', 'Password should have minimum 5 characters').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Not valid format').isEmail(),
    body('password', 'Password should have minimum 5 characters').isLength({ min: 5 }),
    body('fullName', 'Provide your name').isLength({ min: 3 }),
    body('avatarUrl', 'Not valid avatar URL').optional().isURL(),
];