export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS';

export const receiveFollows = followers => ({
    type: RECEIVE_FOLLOWERS,
    followers
});