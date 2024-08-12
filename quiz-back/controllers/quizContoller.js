import QuizModel from '../models/quiz.js';

export const getAll = async (req, res) => {
    try {
        const quizzes = await QuizModel.find().populate({
            path: 'user',
            select: ['first_name', 'last_name', 'avatarUrl'],
        });
        res.json(quizzes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить викторины',
        });
    }
};

export const getById = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await QuizModel.findById(quizId).populate('user').exec();

        if (!quiz) {
            return res.status(404).json({ message: 'Викторина не найдена' });
        }

        res.json(quiz);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удвлось получить викторину',
        });
    }
};

export const createQuiz = async (req, res) => {
    try {
        const doc = new QuizModel({
            title: req.body.title,
            category: req.body.category,
            tags: req.body.tags,
            description: req.body.description,
            cover: req.body.cover,
            questions: req.body.questions,
            user: req.userId,
        });

        const quiz = await doc.save();
        res.json(quiz);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'Не удалось создать викторину',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const quizId = req.params.id;
        QuizModel.findByIdAndDelete({
            _id: quizId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Викторна не найдена',
                    });
                }
                res.json({
                    message: 'success',
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось удалить статью',
                });
            });
    } catch (err) {}
};
