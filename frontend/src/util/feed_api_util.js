import axios from "axios";

export const fetchFeedPlaylists = (username, offset) => (
    axios({
        method: "GET",
        url: `/api/posts/${username}?offset=${offset}`,
    })
);