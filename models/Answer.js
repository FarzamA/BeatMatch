const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    playlist_id: {
        type:mongoose.ObjectId, 
        ref: 'Playlist'
    },
    question_id: {
        type: mongoose.ObjectId, 
        ref: 'Question'
    },
    answer: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = Answer = mongoose.model('Answer', AnswerSchema);