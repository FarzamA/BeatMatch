const express = require("express");
const axios = require("axios");

const router = express.Router();
const { clientId, clientSecret } = require("../../../config/keys");

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
  console.log(token)
  return token;
};

const getSongs = async (token, genre, minKey, minValue, maxKey, maxValue) => {
  const url = `https://api.spotify.com/v1/recommendations?seed_genres=${genre}&${minKey}=${minValue}&${maxKey}=${maxValue}`;
  const response = await axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
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