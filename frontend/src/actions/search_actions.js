import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";

const receiveSearchResults = (searchResults) => ({
    type: RECEIVE_SEARCH_RESULTS,
    searchResults
});

export const clearSearchResults = {
    type: CLEAR_SEARCH_RESULTS
}

export const fetchSearchResults = (query) => (dispatch) => {

    return SearchAPIUtil.fetchSearchResults(query)
        .then(res => dispatch(receiveSearchResults(res.data)))
        .catch(err => console.log(err))

};