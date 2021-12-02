const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicUrl: {
      required: false,
      type: String
    },

    followers: [
      // keep in mind each follow has it's own _id
      {
        user_id: {
          type: mongoose.ObjectId,
          ref: 'User'
        },
        username: {
          type: String,
          required: true
        },
        profilePicUrl: {
          required: false, 
          type: String
        }
      }
    ],
    following: [
      // keep in mind each follow has it's own _id
      {
        user_id: {
          type: mongoose.ObjectId,
          ref: 'User'
        },
        username: {
          type: String,
          required: true
        },
        profilePicUrl: {
          required: false, 
          type: String
        }
      }
    ]
  }, {
    timestamps: true
});

// currently not using, since indexing isn't compatible with regex partial results
// UserSchema.index( {username: "text"} )

module.exports = User = mongoose.model('User', UserSchema);
