const express = require("express");
const axios = require("axios");

const router = express.Router();
const { clientId, clientSecret } = require("../../../config/keys");
const { constants } = require("crypto");

const getToken = async () => {
  const response = await axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      grant_type: "client_credentials",
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  });
  const token = response.data.access_token;
  return token;
};

const getSongs = async (token, genre, answers) => {
  const keys = Object.keys(answers);
  const values = Object.values(answers);
  let query = "";
  // make query portion of url
  for (let i = 0; i < keys.length; i++) {
    query += `&${keys[i]}=${values[0]}`;
  }
  const url = `https://api.spotify.com/v1/recommendations?seed_genres=${genre}${query}`;
  const response = await axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  songs = [];
  response.data.tracks.map((track) => {
    songs.push(track.uri);
  });
  return songs;
};

router.post("/", async (req, res) => {
  const { genre } = req.body;
  const { minKey } = req.body;
  const { minValue } = req.body;
  const { maxKey } = req.body;
  const { maxValue } = req.body;
  try {
    const spotifyToken = await getToken();
    const song = await getSongs(
      spotifyToken,
      genre,
      minKey,
      minValue,
      maxKey,
      maxValue
    );
    res.send({ song });
  } catch (err) {
    res.statusMessage = "Could not get songs";
    res.status(400).end();
  }
});

module.exports = router;
