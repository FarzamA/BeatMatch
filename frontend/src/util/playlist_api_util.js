import axios from "axios";

export const fetchPlaylist = (payload) =>
  axios({
    method: "POST",
    url: "/api/playlists/playlist/",
    data: payload,
  });

export const fetchPlaylistByUser = (userId) =>
  axios({
    method: "GET",
    url: `/api/playlists/user/${userId}`,
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
