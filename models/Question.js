const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    targetCategory: {
        type: String, 
        required: true
    },
    answerOptions: []
}, {
    timestamps: true
});

module.exports = Question = mongoose.model('Question', QuestionSchema);

