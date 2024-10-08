import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array);
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new userModel({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );
        const { passwordHash, ...userData } = user._doc;
        res.json({ ...userData._doc, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};
export const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );
        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );
        const { passwordHash, ...userData } = user._doc;
        res.json({ ...userData._doc, token });
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        const { passwordHash, ...userData } = user._doc;
        res.json({ ...userData._doc });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};
