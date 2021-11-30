import { RECEIVE_PLAYLIST, DELETE_PLAYLIST } from '../actions/playlist_actions';
import { RECEIVE_USER } from '../actions/user_actions';

const _nullState = {};

const playlistsReducer = (state = _nullState, action) => {
    let newState;

    Object.freeze(state);
    switch(action.type){
        case RECEIVE_PLAYLIST:
            return action.playlist;
        case RECEIVE_USER:
            return action.playlists;
         case DELETE_PLAYLIST:
            newState = Object.assign([], state);
            console.log(state, "OLD STATE")
            console.log(newState, "NEW STATE")
            newState.forEach((playlist,idx) => {
                if (playlist._id === action.playlist) {
                    newState.splice(idx,1)
                }
            })
            return newState;
        default:
            return state;
    }
}

export default playlistsReducer;