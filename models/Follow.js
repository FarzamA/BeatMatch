const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    // Current user
    follower_id: {
        type: mongoose.ObjectId, 
        ref: 'User'
    },
    follower_name: {
        type: String,
        required: true
    },
    // The person being followed
    following_id: {
        type: mongoose.ObjectId, 
        ref: 'User'  
    },
    following_name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = Follow = mongoose.model('Follow', FollowSchema);