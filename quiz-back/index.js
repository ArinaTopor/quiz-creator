import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as userController from './controllers/userController.js';
import * as quizContoller from './controllers/quizContoller.js';
import * as categoryController from './controllers/categoryControllers.js';

mongoose
    .connect(
        'mongodb+srv://admin:wwwwww@cluster0.x86qr.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log(err));

const app = express();
const corsOptions = {
    origin: 'http://localhost:4200',
};
app.use(cors(corsOptions));
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());

app.post('/auth/login', userController.login);
app.post('/auth/register', registerValidation, userController.register);
app.get('/auth/user', checkAuth, userController.getUser);
app.post('/categories', categoryController.createCat);
app.get('/quizzes', quizContoller.getAll);
app.get('/quizzes/:id', quizContoller.getById);
app.post('/quizzes', checkAuth, quizContoller.createQuiz);
app.delete('/quizzes/:id', checkAuth, quizContoller.remove);
// app.patch('/quizzes', quizContoller.update); TODO
app.get('/', (req, res) => {
    res.send('All ok!');
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server start');
});
