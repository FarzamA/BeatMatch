const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Follow = require('../../models/Follow');
const User = require('../../models/User');

// Get all users that the current/any user is following
router.get('/user/:user_id', (req, res) => {
    Follow.find({ follower_id: req.params.user_id })
        .then(following => {
            const followedUsers = {}
            following.forEach(follow => {
                User.findOne({ _id: follow.following_id })
                    .then(user => followedUsers[user._id] = user)
            });

            res.json(followedUsers);
        })
        .catch(err => 
            res.status(404).json({ noFollowingFound: 'This user does not follow anyone' }))
});

// Get all users that follow current/specific user 
router.get('/user/:user_id', (req, res) => {
    Follow.find({ following_id: req.params.user_id })
        .then(followers => {
            const followerUsers = {}
            followers.forEach(follow => {
                User.findById(follow.followers_id)
                    .then(user => followerUsers[user._id] = user)
            });

            res.json(followerUsers);
        })
        .catch(err => 
            res.status(404).json({ noFollowersFound: 'This user does not have any followers' }))
});

// Create a follow and increment following count for req.body user(current user)
router.post('/:user_id', (req, res) =>{
    const newFollow = new Follow({
        follower_id: req.body.user_id,
        following_id: req.params.user_id
    });
    newFollow.save().then(follow => res.json(follow));

    // Increment following count of current user
    User.findById(req.body.user_id)
        .then(user => {
            user.following += 1;
            user.save();
            // res.json({ currentUserFollowingCount: user.following });
        });

    // Increment follow count of followed user 
    User.findById(req.params.user_id)
        .then(user => {
            user.followers += 1;
            user.save();
            // res.json({ followedUserFollowerCont: user.followers })
        });

});

// Remove a follow
router.delete('/:id', (req, res) => { 
    Follow.remove({ _id: req.params.id }, function(err, follow) {
        // Decrement following count of current user
        User.findById(follow.follower_id)
            .then(user => {
                user.following -= 1;
                user.save();
                // res.json({ currentUserFollowingCount: user.following });
            });
    
        // Decrement follow count of followed user 
        User.findById(follow.following_id)
            .then(user => {
                user.followers -= 1;
                user.save();
                // res.json({ followedUserFollowerCont: user.followers })
            });

        res.json(follow);
    });


});

module.exports = router;