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
    songs: {
        // songName: {
        //     type: String,
        //     required: false
        // }
    }
        // {
        //     songUri: {
        //         type: String,
        //         required: false
        //     },
            // songName: {
            //     type: Array,
            //     required: false
            // }
        //     // An array just in case there are multiple artists
        //     // artists: [
        //     //     {
        //     //         artistUrl: {
        //     //             type: String,
        //     //             required: true
        //     //         },
        //     //         artistName: {
        //     //             type: String,
        //     //             required: true
        //     //         }
        //     //     }
        //     // ]
        // }
    ,
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
    ],
    spotify_playlist_id: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = Playlist = mongoose.model('Playlist', PlaylistSchema);