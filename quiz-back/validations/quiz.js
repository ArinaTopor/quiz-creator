export const quizCreateValidation = [
    body('title').isLength({ min: 3 }),
    body('cover').optional().isURL(),
    body('category'),
    body('tags').isArray(),
    body('description').optional(),
    body('questions').isArray(),
];
