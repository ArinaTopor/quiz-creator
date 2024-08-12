import mongoose from 'mongoose';
import questionSchema from './question.js';

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        description: String,
        cover: String,
        questions: [questionSchema],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Quiz', quizSchema);
