const express = require("express");
const axios = require("axios");
const querystring = require("querystring")
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

module.exports = router;