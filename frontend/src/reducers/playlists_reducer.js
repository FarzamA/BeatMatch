import { RECEIVE_PLAYLIST, DELETE_PLAYLIST, RECEIVE_ADDL_PLAYLISTS_BY_USER } from '../actions/playlist_actions';
import { RECEIVE_USER } from '../actions/user_actions';

const _nullState = {};

const playlistsReducer = (state = _nullState, action) => {
    let newState;

    Object.freeze(state);
    switch(action.type){
        case RECEIVE_PLAYLIST:
            return action.playlist;
        // case RECEIVE_USER:
        //     return action.playlists;
         case DELETE_PLAYLIST:
            newState = Object.assign([], state);
            newState.forEach((playlist,idx) => {
                if (playlist._id === action.playlist) {
                    newState.splice(idx,1)
                }
            })
            return newState;
        case RECEIVE_ADDL_PLAYLISTS_BY_USER:
            newState = state.concat(action.playlists);
            return newState;
        default:
            return state;
    }
};

export default playlistsReducer;