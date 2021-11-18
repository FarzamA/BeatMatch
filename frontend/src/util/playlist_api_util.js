import axios from 'axios';

export const fetchPlaylist = (payload) => (
    axios({
        method: 'POST',
        url: '/api/playlists/playlist/',
        data: payload
    })
);
