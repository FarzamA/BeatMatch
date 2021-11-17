import axios from "axios";

export const fetchSearchResults = (query) => (
    axios.get(`api/users/search/${query}`)
)