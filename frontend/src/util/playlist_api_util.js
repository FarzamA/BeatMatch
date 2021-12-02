import axios from "axios";

export const fetchPlaylist = (payload) =>
  axios({
    method: "POST",
    url: "/api/playlists/playlist/",
    data: payload,
  });

export const fetchPlaylistByUser = (username, offset) =>
  axios({
    method: "GET",
    url: `/api/playlists/user/${username}?offset=${offset}`,
  });

export const postPlaylist = (playlist) =>
  axios({
    method: "POST",
    url: `/api/playlists/`,
    data: playlist,
  });

export const deletePlaylist = (playlistId) =>
  axios({
    method: "DELETE",
    url: `/api/playlists/${playlistId}`,
  });
