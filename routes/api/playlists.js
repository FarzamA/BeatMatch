const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require("../../config/keys").mongoURI;
// const passport = require('passport');

const Playlist = require('../../models/Playlist');
const Post = require('../../models/Post');
const User = require('../../models/User')

// Get all playlists by a specific user
router.get('/user/:user_id', (req, res) => {
    Playlist.find({ user: req.params.user_id })
        .then(playlists => {
            res.json(playlists)
        })
        .catch(err => 
            res.status(404).json({ noPlaylistsFound: 'No playlists found from that user' }))
});

router.post('/playlist', (req, res) => {

    // Send all of your answers to request.body
    Playlist.find({
        answers: req.body.answers,
        genre: req.body.genre
    }).then(playlists => {

        if (playlists.length > 0){
            return res.json(playlists[Math.floor((Math.random() * playlists.length-1))])
        } else{
            Playlist.find({ genre: req.body.genre })
                .then(playlists => res.json(playlists[Math.floor((Math.random() * playlists.length-1))]))
                .catch(err => console.log(err))
        }
    })
    .catch(err => 
            res.status(404).json({ noPlaylistFound: 'No playlist found from that user' }))
})
// Get a single playlist based on id
router.get('/:id', (req, res) => {
    Playlist.findById(req.params.id)
        .then(playlist => res.json(playlist))
        .catch(err => 
            res.status(404).json({ noPlaylistFound: 'No playlist found with that id' }))
});

// Create a new playlist
router.post('/', (req, res) => {
    const newPlaylist = new Playlist({
        user_id: req.body.user_id,
        name: req.body.playlist.name,
        songs: [...req.body.playlist.songs],
        answers: [...req.body.playlist.answers],
        genre: req.body.playlist.genre,
        spotify_embed_link: req.body.playlist.spotify_embed_link
    })

    newPlaylist.save().then(playlist => {
        User.findById(req.body.user_id)
        .then(user => {
            const creator = user;
            let arr = user.followers;
            arr.forEach(follower => {
                const post1 = new Post({
                    creator: req.body.user_id,
                    creator_name: user.username,
                    creator_profilePicUrl: user.profilePicUrl,
                    target: follower.user_id,
                    spotify_embed_link: playlist.spotify_embed_link,
                    creation_date: playlist.createdAt
                });
                post1.save().then().catch(err => console.log(err));
            });

            // to populate your playlists in your own feed
            const post2 = new Post({
                creator: req.body.user_id,
                creator_name: creator.username,
                creator_profilePicUrl: creator.profilePicUrl,
                target: creator._id,
                spotify_embed_link: playlist.spotify_embed_link,
                creation_date: playlist.createdAt
            });

            post2.save().then().catch(err => console.log(err));
        })

        return res.json(playlist)
    })
});

router.delete('/:id', (req, res) => { 
    const playlistId = req.params.id
    Playlist.deleteOne({ _id: req.params.id }).then( playlist => 
        res.json(playlistId)).catch( error => 
            console.log(error));
})
module.exports = router;
