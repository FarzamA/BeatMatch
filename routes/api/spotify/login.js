const express = require("express");
const axios = require("axios");
const queryString = require("query-string");
const router = express.Router();
const { clientId, clientSecret, redirectUri } = require("../../../config/keys");

const generateRandomString = (length) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

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
  console.log(token);
  return token;
};

router.get("/", async (req, res) => {
  let state = generateRandomString(16);
  const scope = "user-read-private user-read-email playlist-modify playlist-modify-public";
  const params = {
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    state,
    scope,
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

const getProfile = async (token) => {
    const response = await axios ({
        url: "https://api.spotify.com/v1/me",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  //   const storedState = state;
  let state = req.query.state || null;
  //   console.log(storedState);
  console.log(req.cookies)
  console.log(state);
  console.log("in callback");

  try {
    const spotifyToken = await getAccessToken(code);
    const myprofile = await getProfile(spotifyToken)
    res.send({ myprofile });
  } catch (err) {
    console.log(err);
    res.statusMessage = "Could not get songs";
    res.status(400).end();
  }
});

module.exports = router;
