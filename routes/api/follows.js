const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Follow = require('../../models/Follow');

// Get all users that the current/any user is following
router.get('/user/:user_id', (req, res) => {
    Follow.find({ follower_id: req.params.user_id })
        .then(following => res.json(following))
        .catch(err => 
            res.status(404).json({ noFollowingFound: 'This user does not follow anyone' }))
});

// Get all users that follow current/specific user 
router.get('/user/:user_id', (req, res) => {
    Follow.find({ following_id: req.params.user_id })
        .then(followers => res.json(followers))
        .catch(err => 
            res.status(404).json({ noFollowersFound: 'This user does not have any follows' }))
});

// Create a follow 
router.post('/', (req, res) =>{
    
});