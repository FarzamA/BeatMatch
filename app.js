const mongoose = require('mongoose');
const express = require("express");
const passport = require('passport');
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const bodyParser = require('body-parser');
// const upload = require("./routes/upload");
const Grid = require("gridfs-stream");

let gfs;
// connection();




mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

// allows for postman tests
app.use(bodyParser.urlencoded({ extended: false }));
// tells app to only respond to json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send('hello world!')
});


// to display single file object
app.get("/file/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    return res.json(file);
  })
});

app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image 
    // if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read the output to browser 
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    // } else {
      // res.status(404).json({
      //   err: 'Not an image'
      // })
    // }
  })
});


app.use(passport.initialize());
require('./config/passport')(passport);
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
