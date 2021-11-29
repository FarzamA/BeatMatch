const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: {
        type: mongoose.ObjectId, 
        ref: 'User'
    },
    target: {
        type: mongoose.ObjectId, 
        ref: 'User'
    },
    spotify_embed_link: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

module.exports = Post = mongoose.model('Post', PostSchema);