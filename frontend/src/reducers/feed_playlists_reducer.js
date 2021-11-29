import { RECEIVE_FEED_PLAYLISTS } from '../actions/feed_playlist_actions';

const _nullState = [];

const feedPlaylistsReducer = (state = _nullState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_FEED_PLAYLISTS:
            return action.playlists;
        default:
            return state;
    }

};

export default feedPlaylistsReducer;