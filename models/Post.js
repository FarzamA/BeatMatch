const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: {
        type: mongoose.ObjectId, 
        ref: 'User'
    },
    creator_name: {
        type: String,
        required: true
    },
    creator_profilePicUrl: {
        required: false,
        type: String
    },
    target: {
        type: mongoose.ObjectId, 
        ref: 'User'
    },
    playlist_id: {
        type: mongoose.ObjectId, 
        ref: 'Playlist'
    },
    spotify_embed_link: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});

module.exports = Post = mongoose.model('Post', PostSchema);