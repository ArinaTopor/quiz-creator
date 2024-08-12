import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('first_name').isLength({ min: 5 }),
    body('last_name').isLength({ min: 5 }),
    body('avatarUrl').optional().isURL(),
];
export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
];
