import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import userModel from './models/user.js';
import bcrypt from 'bcrypt';
import checkAuth from './utils/checkAuth.js';
import * as userController from './controllers/userController.js';

mongoose
    .connect(
        'mongodb+srv://admin:wwwwww@cluster0.x86qr.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post('/auth/login', userController.login);

app.post('/auth/register', registerValidation, userController.register);

app.get('/auth/user', checkAuth, userController.getUser);

app.get('/', (req, res) => {
    res.send('All ok!');
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server start');
});
