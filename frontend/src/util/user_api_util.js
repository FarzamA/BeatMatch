import axios from 'axios';

export const fetchUser = (username) => (
    axios.get(`/api/users/${username}`)
);

export const followUser = (username, followData) => (
    axios.post(`/api/users/follow/${username}`, followData)
);

export const unfollowUser = (username, followData) => (
    axios({
        method: 'delete',
        url: `/api/users/follow/${username}`,
        data: {...followData}
    })
);