const express = require("express");
const axios = require("axios");
const queryString = require("query-string");
const router = express.Router();
const { clientId, clientSecret, redirectUri } = require("../../../config/keys");
const Playlist = require('../../../models/Playlist')
const generateRandomString = (length) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/", async (req, res) => {
  let state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email playlist-modify playlist-modify-public";
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state,
  };
  const url =
    "https://accounts.spotify.com/authorize?" + queryString.stringify(params);
  console.log(url);
  console.log("in login");
  res.redirect(url);
});

const getAccessToken = async (code) => {
  const tokenResponse = await axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
    json: true,
  });
  const token = tokenResponse.data.access_token;
  console.log(token);
  return token;
};

const createPlaylist = async (token) => {
  console.log("in playlist2");
  const response = await axios({
    url: "https://api.spotify.com/v1/users/11151312496/playlists",
    method: "post",
    data: {
      name: "My First Playlist",
      description: "Playlist Description",
      public: true,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("in playlist2");
  return response.data;
};
const getSongs = async (token, genre, minKey, minValue, maxKey, maxValue) => {
  const url = `https://api.spotify.com/v1/recommendations?seed_genres=${genre}&${minKey}=${minValue}&${maxKey}=${maxValue}`;
  const response = await axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  songs = "";
  response.data.tracks.map((track) => {
    // songs.push(track.uri);
    songs+=(track.uri + ",")
  });
  return songs;
};


const addSongs = async (token,songs) => {
  console.log("in songs");
  const response = await axios({
    url: "https://api.spotify.com/v1/playlists/6BChGBgnr5ULuORQUuBhzm/tracks",
    method: "post",
    params: {
      uris: songs
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("in playlist2");
  return response.data;
};


router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  let state = req.query.state || null;
  console.log("in callback");
  try {
    const spotifyToken = await getAccessToken(code);
    // const newPlaylist = await createPlaylist(spotifyToken);
    const songs = await getSongs(
      spotifyToken,
      "hip-hop",
      "min_acousticness",
      0.6,
      "max_acousticness",
      0.8
    );
      console.log(songs)
      const addedSongs = await addSongs(spotifyToken,songs)
    res.send({ addedSongs });
  } catch (err) {
    console.log(err);
    res.statusMessage = "Could not get songs";
    res.status(400).end();
  }
});

module.exports = router;
