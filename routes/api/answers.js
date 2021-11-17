const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Answer = require('../../models/Answer');

router.get('/:id', (req, res) => {
    Answer.findById(req.params.id)
        .then(answer => res.json(answer))
        .catch(err => 
            res.status(404).json({ noAnswerFound: 'No answer found'}));
});

router.get('/', (req, res) => {
    Answer.find()
        .then(answers => res.json(answers))
        .catch(err => 
            res.status(404).json({ noAnswersFound: 'No answers found'}));
});

router.post('/', (req, res) => {
    const newAnswer = new Answer({
        playlist_id: req.body.playlist_id,
        question_id: req.body.question_id,
        answer: req.body.answer
    });

    newAnswer.save().then(answer => res.json(answer));
});

module.exports = router;