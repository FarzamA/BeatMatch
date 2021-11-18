import { RECEIVE_PLAYLIST } from '../actions/playlist_actions';

const _nullState = {};

const playlistsReducer = (state = _nullState, action) => {
    Object.freeze(state);

    switch(action.type){
        case RECEIVE_PLAYLIST:
            return action.playlist
        default:
            return state;
    }
}

export default playlistsReducer;