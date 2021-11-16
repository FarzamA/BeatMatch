import { RECEIVE_USER, RECEIVE_USER_FOLLOW, REMOVE_USER_FOLLOW } from "../actions/user_actions";

const _nullState = {};

const followersReducer = (state = _nullState, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type) {
        case RECEIVE_USER:
            let followers = action.user.followers;
            return followers ? followers : _nullState;
        case RECEIVE_USER_FOLLOW:
            newState = Object.assign({}, state);
            newState[action.userFollow.user_id] = action.userFollow;
            return newState;
        case REMOVE_USER_FOLLOW:
            newState = Object.assign({}, state);
            debugger;
            delete newState[action.userFollow.user_id];
            return newState;
        default:
            return state;
    }
};

export default followersReducer;
