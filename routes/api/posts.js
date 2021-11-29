const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require("../../config/keys").mongoURI;

const Post = require('../../models/Post');

router.get('/:offset', (req, res) => {
    const offset = parseInt(req.params.offset);
    Post.find({ target: req.body.user_id }).sort( [['_id', -1]] ).skip(offset).limit(10)
        .then(posts => {
            res.json(posts)
        })
});

module.exports = router;