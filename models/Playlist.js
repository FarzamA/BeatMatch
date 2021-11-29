const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    user_id: {
        type: mongoose.ObjectId, 
        ref: 'User'
    },
    name: {
        type: String, 
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: true
    },
    // Holds song id's
    songs: [],
    // Holds answer Id's
    answers: [],
    // spotify_playlist_id: {
    //     type: String,
    //     required: true
    // },
    spotify_embed_link: {
        type: String,
        required: true
    }
    // public: Boolean
},{
    timestamps: true
});

module.exports = Playlist = mongoose.model('Playlist', PlaylistSchema);