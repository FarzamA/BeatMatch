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
      required: true,
      type: String,
      default: 'https://fixedin-seeds.s3.amazonaws.com/defaultUser.png'
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
        }
      }
    ]
  }, {
    timestamps: true
});

module.exports = User = mongoose.model('User', UserSchema);
