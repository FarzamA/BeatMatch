const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Question = require('../../models/Question');


// Get a single question
router.get('/:id', (req, res) => {
    Question.findById(req.params.id)
        .then(question => res.json(question))
        .catch(err => 
            res.status(404).json({ noQuestionFound: 'No question found'}));
});

// Get all questions
router.get('/', (req, res) => {
    Question.find()
        .then(questions => res.json(questions))
        .catch(err => 
            res.status(404).json({ noQuestionsFound: 'No questions found'}));
});


// allow for users to submit their own questions in the future?
router.post('/', (req, res) => {
    console.log(req.body.answerOptions);
    const newQuestion = new Question({
        question: req.body.question,
        targetCategory: req.body.targetCategory, 
        answerOptions: req.body.answerOptions
    })

    newQuestion.save().then(question => res.json(question))
});


module.exports = router;


