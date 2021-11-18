import * as PlaylistAPIUtil from '../util/playlist_api_util';

export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";

export const receivePlaylist = playlist => ({
    type: RECEIVE_PLAYLIST,
    playlist
});

export const fetchPlaylist = (payload) => (dispatch) => {
    debugger;
    return PlaylistAPIUtil.fetchPlaylist(payload)
        .then(res => dispatch(receivePlaylist(res.data)))
        .catch(err => console.log(err))
};

export const fetchPlaylistByUser = (userId) => (dispatch) => {
    debugger;
    return PlaylistAPIUtil.fetchPlaylistByUser(userId)
        .then(res => dispatch(receivePlaylist(res.data)))
        .catch(err => console.log(err))
};