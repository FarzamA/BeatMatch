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
    followers: [
      {
        user: {
          type: ObjectId,
          ref: 'User'
        }
      }
    ],
    following: [
      {
        user: {
          type: ObjectId,
          ref: 'User'
        }
      }
    ]
  }, {
    timestamps: true
});

module.exports = User = mongoose.model('User', UserSchema);
