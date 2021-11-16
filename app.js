const mongoose = require('mongoose');
const express = require("express");
const passport = require('passport');
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const playlists = require("./routes/api/playlists");
const songs = require('./routes/api/songs');
const answers = require('./routes/api/answers');
const bodyParser = require('body-parser');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// allows for postman tests
app.use(bodyParser.urlencoded({ extended: false }));
// tells app to only respond to json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send('hello world!')
});

app.use(passport.initialize());
require('./config/passport')(passport);
app.use("/api/users", users);
app.use('/api/songs', songs);
app.use('/api/answers', answers);
app.use('/api/playlists', playlists);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
