const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    // Current user
    follower_id: {
        type: mongoose.ObjectId, 
        ref: 'User'
    },
    // The person being followed
    following_id: {
        type: mongoose.ObjectId, 
        ref: 'User'  
    }
},{
    timestamps: true
});

module.exports = Follow = mongoose.model('Follow', FollowSchema);