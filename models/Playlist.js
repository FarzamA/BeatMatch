const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    user: {
        type: mongoose.ObjectId, 
        ref: 'users'
    },
    name: {
        type: String, 
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    songs: [
        {
            songUrl: {
                type: String,
                required: true
            },
            songName: {
                type: String,
                required: true
            },
            // An array just in case there are multiple artists
            artists: [
                {
                    artistUrl: {
                        type: String,
                        required: true
                    },
                    artistName: {
                        type: String,
                        required: true
                    }
                }
            ]
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
},{
    timestamps: true
});

module.exports = Playlist = mongoose.model('Playlist', PlaylistSchema);