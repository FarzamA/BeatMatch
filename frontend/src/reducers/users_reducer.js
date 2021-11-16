import { RECEIVE_USER } from '../actions/user_actions';
const _ = require("lodash");

const _nullState = {};

const usersReducer = (state = _nullState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_USER:
            let userWithoutFollowers = _.omit(action.user, ['followers', 'followed']);
            return userWithoutFollowers;
        default:
            return state;
    }
};

export default usersReducer;