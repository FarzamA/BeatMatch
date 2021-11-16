const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

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

