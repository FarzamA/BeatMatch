import axios from 'axios';

export const fetchUser = (username) => (
    axios.get(`/api/users/${username}`)
);

export const followUser = (username, followData) => (
    axios.post(`/api/follow/${username}`, followData)
);

export const unfollowUser = (username, followData) => (
    axios.delete(`api/follow/${username}`, followData)
);