import * as PlaylistAPIUtil from '../util/playlist_api_util';

export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const RECEIVE_ADDL_PLAYLISTS_BY_USER = "RECEIVE_ADDL_PLAYLISTS_BY_USER";

export const receivePlaylist = playlist => ({
    type: RECEIVE_PLAYLIST,
    playlist
});

export const deletePlaylist = playlist => ({
    type: DELETE_PLAYLIST,
    playlist
});

export const receiveAddlPlaylistsByUser = playlists => ({
    type: RECEIVE_ADDL_PLAYLISTS_BY_USER,
    playlists
});

export const fetchPlaylist = (payload) => (dispatch) => {
    return PlaylistAPIUtil.fetchPlaylist(payload)
        .then(res => dispatch(receivePlaylist(res.data)))
        .catch(err => console.log(err))
};

export const fetchPlaylistByUser = (userId, offset) => (dispatch) => {
    return PlaylistAPIUtil.fetchPlaylistByUser(userId,offset)
        .then(res => {
            dispatch(receivePlaylist(res.data))
        })
        .catch(err => console.log(err))
};

export const fetchAddlPlaylistsByUser = (userId, offset) => (dispatch) => (
    PlaylistAPIUtil.fetchPlaylistByUser(userId, offset)
        .then(res => dispatch(receiveAddlPlaylistsByUser(res.data)))
        .catch(err => console.log(err))
);

export const deleteUserPlaylist = (userId) => dispatch => {
    return PlaylistAPIUtil.deletePlaylist(userId)
        .then(res => dispatch(deletePlaylist(res.data)))
        .catch(err => console.log(err))
};