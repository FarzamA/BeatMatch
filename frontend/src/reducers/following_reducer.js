import { RECEIVE_USER } from '../actions/user_actions';

const _nullState = {};

const followingReducer = (state = _nullState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_USER:
            let following = action.user.following;
            return following ? following : _nullState;
        default:
            return state;
    }
};

export default followingReducer;