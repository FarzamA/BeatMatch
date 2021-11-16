import { RECEIVE_USER, RECEIVE_USER_FOLLOW, REMOVE_USER_FOLLOW } from "../actions/user_actions";

const _nullState = {};

const followersReducer = (state = _nullState, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type) {
        case RECEIVE_USER:
            let followers = action.user.followers;
            if (followers) {
                newState = {};
                followers.forEach(follower => {
                    newState[follower.username] = follower;
                });
            }
            return newState
        case RECEIVE_USER_FOLLOW:
            newState = Object.assign({}, state);
            newState[action.userFollow.username] = action.userFollow;
            return newState;
        case REMOVE_USER_FOLLOW:
            newState = Object.assign({}, state);
            delete newState[action.userFollow.username];
            return newState;
        default:
            return state;
    }
};

export default followersReducer;
