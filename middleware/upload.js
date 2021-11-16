const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const db = require('../config/keys').mongoURI;

const storage = new GridFsStorage({
    url: db,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-beat-match-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-beat-match-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });