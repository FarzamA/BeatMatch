import * as FeedAPIUtil from '../util/feed_api_util';

export const RECEIVE_INITIAL_FEED_PLAYLISTS = "RECEIVE_INITIAL_FEED_PLAYLISTS";
export const RECEIVE_ADDL_FEED_PLAYLISTS = "RECEIVE_ADDL_FEED_PLAYLISTS";

export const receiveInitialFeedPlaylists = playlists => ({
    type: RECEIVE_INITIAL_FEED_PLAYLISTS,
    playlists
});

export const receiveAddlFeedPlaylists = playlists => ({
    type: RECEIVE_ADDL_FEED_PLAYLISTS,
    playlists
});

export const fetchInitialFeedPlaylists = (username, offset) => (dispatch) => (
    FeedAPIUtil.fetchFeedPlaylists(username, offset)
        .then(res => dispatch(receiveInitialFeedPlaylists(res.data)))
        .catch(err => console.log(err))
);

export const fetchAddlFeedPlaylists = (username, offset) => (dispatch) => (
    FeedAPIUtil.fetchFeedPlaylists(username, offset)
        .then(res => dispatch(receiveAddlFeedPlaylists(res.data)))
        .catch(err => console.log(err))
);