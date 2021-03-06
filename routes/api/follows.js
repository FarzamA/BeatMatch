const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require("../../config/keys").mongoURI;

const Follow = require('../../models/Follow');
const User = require('../../models/User');

// Get all users that the current/any user is following
router.get('/following/:user_id', (req, res) => {
    Follow.find({ follower_id: req.params.user_id })
        .then(following => {
            // returns hash of followed user
            res.json({...following});
        })
        .catch(err => 
            res.status(404).json({ noFollowingFound: 'This user does not follow anyone' }))
});

// Get all users that follow current/specific user 
router.get('/followers/:user_id', (req, res) => {
    Follow.find({ following_id: req.params.user_id })
        .then(followers => {
            res.json({...followers});
        })
        .catch(err => 
            res.status(404).json({ noFollowersFound: 'This user does not have any followers' }))
});

// Create a follow and increment following count for req.body user(current user)
router.post('/:user_id', (req, res) =>{
    Follow.findOne({ follower_id: req.body.user_id, following_id: req.params.user_id })
        .then(follow => res.status(400).json({ alreadyFollow: 'You already follow this user', follow: follow }))
        .catch(err => {
            // Increment following count of current user
            User.findById(req.body.user_id)
                .then(user => {
                    user.following += 1;
                    const currentUser = user;
                    user.save();
        
                    // Increment follow count of followed user 
                    User.findById(req.params.user_id)
                    .then(user => {
                        user.followers += 1;
                        user.save();
                        const newFollow = new Follow({
                            follower_id: currentUser._id,
                            follower_name: currentUser.name,
                            following_id: user._id,
                            following_name: user.name
                        });
                        newFollow.save().then(follow => res.json({ follow: follow })).catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
});

// Remove a follow
router.delete('/:id', (req, res) => { 
    // let currentUser;
    // let followedUser;

    Follow.findById(req.params.id).then(follow => {
        // Decrement following count of current user
        User.findById(follow.follower_id)
        .then(user => {
            user.following -= 1;
            // currentUser = user.following;
            user.save();
            // res.json({ currentUserFollowingCount: user.following });

            
            // Decrement follow count of followed user 
            User.findById(follow.following_id)
            .then(user => {
                user.followers -= 1;
                // followedUser = user.followers;
                user.save();
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));

    Follow.deleteOne({ _id: req.params.id }).then(follow => res.json({ 
        follow: follow
    })).catch(err => console.log(err));


});

module.exports = router;