const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    user: {
        type: mongoose.ObjectId, 
        ref: 'users'
    },
    songs: [
        {
            songUrl: {
                type: String,
                required: true
            }
        }
    ],
    answers: [
        {
            question_id: {
                type: mongoose.ObjectId, 
                ref: 'Question'
            },
            answer: {
                type: String,
                required: true
            }
        }
    ]
})