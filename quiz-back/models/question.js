import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    image: String,
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
});
export default questionSchema;
