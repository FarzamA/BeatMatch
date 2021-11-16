const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Question = require('../../models/Question');

router.get('/:id', (req, res) => {
    Question.findById(req.params.id)
        .then(question => res.json(question))
        .catch(err => 
            res.status(404).json({ noQuestionFound: 'No question found'}));
});

// allow for users to submit their own questions in the future?
router.post('/', (req, res) => {
    const newQuestion = new Question({
        question: req.body.question,
        targetCategory: req.body.targetCategory 
    })

    newQuestion.save().then(question => res.json(question))
});


module.exports = router;


