import { RECEIVE_INITIAL_FEED_PLAYLISTS, RECEIVE_ADDL_FEED_PLAYLISTS } from '../actions/feed_playlist_actions';

const _nullState = {};

const feedPlaylistsReducer = (state = _nullState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_INITIAL_FEED_PLAYLISTS:
            return action.playlists;
        case RECEIVE_ADDL_FEED_PLAYLISTS:
            let newState = state.concat(action.playlists);
            return newState;
        default:
            return state;
    }

};

export default feedPlaylistsReducer;