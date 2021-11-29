import { RECEIVE_PLAYLIST } from '../actions/playlist_actions';
import { RECEIVE_USER } from '../actions/user_actions';

const _nullState = {};

const playlistsReducer = (state = _nullState, action) => {
    Object.freeze(state);

    switch(action.type){
        case RECEIVE_PLAYLIST:
            return action.playlist;
        case RECEIVE_USER:
            return action.playlists;
        default:
            return state;
    }
};

export default playlistsReducer;