const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const passport = require('passport');

const Playlist = require('../../models/Playlist');

// Get all playlists by a specific user
router.get('/user/:user_id', (req, res) => {
    Playlist.find({ user: req.params.user_id })
        .then(playlists => res.json(playlists))
        .catch(err => 
            res.status(404).json({ noPlaylistsFound: 'No playlists found from that user' }))
});

// Get a single playlist based on id
router.get('/:id', (req, res) => {
    Playlist.findById(req.params.id)
        .then(playlist => res.json(playlist))
        .catch(err => 
            res.status(404).json({ noPlaylistFound: 'No playlist found with that id' }))
});

// Create a new playlist
router.post('/', (req, res) => {
    console.log(req.body, 'request');
    const newPlaylist = new Playlist({
        user_id: req.body.user_id,
        name: req.body.name,
        songs: {...req.body.songName},
        answers: [{ question_id: req.body.question_id, answer: req.body.answer }],
        playlist_id: req.body.playlist_id
    })

    newPlaylist.save().then(playlist => res.json(playlist))

});

module.exports = router;