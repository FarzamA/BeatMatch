import * as FeedAPIUtil from '../util/feed_api_util';

export const RECEIVE_FEED_PLAYLISTS = "RECEIVE_FEED_PLAYLISTS";

export const receiveFeedPlaylists = playlists => ({
    type: RECEIVE_FEED_PLAYLISTS,
    playlists
});

export const fetchFeedPlaylists = (username, offset) => (dispatch) => (
    FeedAPIUtil.fetchFeedPlaylists(username, offset)
        .then(res => dispatch(receiveFeedPlaylists(res.data)))
        .catch(err => console.log(err))
);