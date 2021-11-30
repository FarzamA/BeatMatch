const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require("../../config/keys").mongoURI;

const Post = require('../../models/Post');

router.get('/:username', (req, res) => {
    const offset = parseInt(req.query.offset);

    User.findOne({ username: req.params.username }).then(user => {
        Post.find({ target: user._id }).sort( [['creation_date', -1]] ).skip(offset).limit(5)
            .then(posts => {
                res.json(posts)
            })
    })
});

module.exports = router;