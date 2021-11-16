import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import followersReducer from './followers_reducer';
import followingReducer from './following_reducer'

const entitiesReducer = combineReducers({
    users: usersReducer,
    followers: followersReducer,
    following: followingReducer
});

export default entitiesReducer;