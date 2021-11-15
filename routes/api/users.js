const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    });
});

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        errors.username = "User already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = { id: user.id, username: user.username };
  
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    } 
  });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "This user does not exist";
        return res.status(400).json(errors);
      }
  
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, email: user.email, username: user.username };
  
          jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Incorrect password";
          return res.status(400).json(errors);
        }
      });
    });
});

router.post('/follow/:username', (req, res) => {
  // Find the user based on their username
  User.findOne({ username: req.params.username })
    .then(user => {
      // Check if the follow request by other user already exists 
      if (user.followers.filter(follower => follower.username === req.body.username).length > 0) {
        res.status(400).json({ alreadyFollow: 'You already follow this user'})
      } else {
        // Create variables to push into arrays later
        const user_1 = user;

        const followed = {
          user_id: user._id,
          username: user.username
        };

        // Find the current user by username not id because id isn't included in the body
        User.findOne({ username: req.body.username })
          .then(user => {
            const follower = {
              user_id: user._id,
              username: user.username
            };

            user_1.followers.push(follower);

            user.following.push(followed);

            user_1.save();
            user.save();
            res.json({ success: 'success' });
          })
          .catch(err => console.log(err));
      }
    })
});

router.delete('/follow/:username', (req, res) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      const idx = user.followers.findIndex((follower) => follower.username === req.body.username)
      console.log(idx);
      if (idx >= 0) {
        user.followers.splice(idx, 1);

        User.findOne({ username: req.body.username })
        .then(user => {
          const idx2 = user.following.findIndex((follow) => follow.username === req.params.username);
          user.following.splice(idx2, 1);
          user.save();
        })

          
        console.log(user.followers, 'followers');
        user.save();
        res.json({ success: 'success' });
      } else {
        res.status(400).json({ alreadyUnFollow: "You don't follow this user"})
      }
    })
});

router.post('/profile/:username', (req, res) => {
  User.findByIdAndUpdate(req.params.user._id)
})



module.exports = router;