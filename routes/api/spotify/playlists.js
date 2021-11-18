const express = require("express");
const axios = require("axios");
const queryString = require("query-string");
const router = express.Router();
const { clientId, clientSecret, redirectUri } = require("../../../config/keys");
const Playlist = require("../../../models/Playlist");
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

const createPlaylist = async (token, name) => {
  console.log("in playlist2");
  const response = await axios({
    url: "https://api.spotify.com/v1/users/6g1bk9tzjh4vnoe0lf3a2rxrj/playlists",
    method: "post",
    data: {
      name,
      description: "Playlist Description",
      public: true,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("in playlist2");
  const playlist = {
    name,
    id: response.data.id,
  };
  console.log(response.data)
  return playlist;
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

  songs = "";
  songNames = []
  response.data.tracks.map((track) => {
    songs += track.uri + ",";
    songNames.push(track.name)
  });

  const songs_object = {
    uris: songs,
    names: songNames
  }
  return songs_object;
};

const addSongs = async (token, playlistId, songs) => {
  console.log("in songs");
  const response = await axios({
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    method: "post",
    params: {
      uris: songs,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("in add songs");
  return response.data;
};

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  let state = req.query.state || null;
  console.log("in callback");
  try {
    const testAnswers = {
      min_acousticness: 0.5,
      // max_acousticnes: 0.5,
      min_danceability: 0.5,
      // max_danceability: 0.5,
      // min_duration: 0.5,
      // max_duration: 0.5,
      // min_energy: 0.5,
      // max_energy: 0.5,
      // min_instrumentalness: 0.5,
      // max_instrumentalness: 0.5,
      // min_popularity: 0.5,
      // max_popularity: 0.5,
    };
    const spotifyToken = await getAccessToken(code);
    const songs = await getSongs(spotifyToken, "hip-hop", testAnswers);
    let name = `${songs.names[0]} and Other Curated Favorites`
    const playlist = await createPlaylist(spotifyToken, name);

    console.log(songs);
    const addedSongs = await addSongs(spotifyToken, playlist.id, songs.uris);

    const newPlaylist = new Playlist({
      user_id: "6195acd60fabb55cc4fd06c0",
      name: playlist.name,
      songs: songs.uris,
      answers: Object.values(testAnswers),
      spotify_embed_link: `https://open.spotify.com/embed/playlist/${playlist.id}`
    })
    await newPlaylist.save()
    res.send({ newPlaylist });
    // res.send({ req });
  } catch (err) {
    console.log(err);
    res.statusMessage = "Could not get songs";
    res.status(400).end();
  }
});

module.exports = router;
