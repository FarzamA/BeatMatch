const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require("../../config/keys").mongoURI;

const Post = require('../../models/Post');

router.get('/:username', (req, res) => {
    console.log(req.query.offset)
    const offset = parseInt(req.query.offset);

    User.findOne({ username: req.params.username }).then(user => {
        Post.find({ target: user._id }).sort( [['_id', -1]] ).skip(offset).limit(10)
            .then(posts => {
                res.json(posts)
            })
    })
});

module.exports = router;