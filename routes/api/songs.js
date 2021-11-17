
// Farzam's code
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Song = require('../../models/Song');

router.get('/:id', (req, res) => {
    Song.findById(req.params.id)
        .then(song => res.json(song))
        .catch(err => 
            res.status(404).json({ noSongFound: 'No song found'}));
});


router.get('/', (req, res) => {
    Song.find()
        .then(songs => res.json(songs))
        .catch(err => 
            res.status(404).json({ noSongsFound: 'No songs found'}));
});

router.post('/', (req, res) => {
    const newSong = new Song({
        playlist_id: req.body.playlist_id,
        name: req.body.name,
        uri: req.body.uri
    });

    newSong.save().then(song => res.json(song));
});

module.exports = router;
