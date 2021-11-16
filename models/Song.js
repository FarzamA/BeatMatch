const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    playlist_id: {
        type:mongoose.ObjectId, 
        ref: 'Playlist'
    },
    name: {
        type: String,
        required: true
    },
    uri: {
        type: String, 
        required: true
    }
},{
    timestamps: true
});

module.exports = Song = mongoose.model('Song', SongSchema);