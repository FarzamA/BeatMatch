import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_FOLLOW = "RECEIVE_USER_FOLLOW";
export const REMOVE_USER_FOLLOW = "REMOVE_USER_FOLLOW";

export const receiveUser = ({user, playlists}) => ({
    type: RECEIVE_USER,
    user,
    playlists
});

export const receiveUserFollow = userFollow => ({
    type: RECEIVE_USER_FOLLOW,
    userFollow
});

export const removeUserFollow = userFollow => ({
    type: REMOVE_USER_FOLLOW,
    userFollow
});

export const fetchUser = (username) => (dispatch) => (
    UserAPIUtil.fetchUser(username)
        .then(res => dispatch(receiveUser(res.data)))
        .catch(err => console.log(err))
);

export const followUser = (username, followData) => dispatch => (
    UserAPIUtil.followUser(username, followData)
        .then(res => dispatch(receiveUserFollow(res.data)))
        .catch(err => console.log(err))
);

export const unfollowUser = (username, followData) => dispatch => {

    return UserAPIUtil.unfollowUser(username, followData)
        .then(res => dispatch(removeUserFollow(res.data)))
        .catch(err => console.log(err))
};