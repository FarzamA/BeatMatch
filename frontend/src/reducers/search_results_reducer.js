import { RECEIVE_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS } from "../actions/search_actions";

const _nullState = [];

const searchResultsReducer = (state = _nullState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_SEARCH_RESULTS:
            return action.searchResults;
        case CLEAR_SEARCH_RESULTS:
            return _nullState;
        default:
            return _nullState;
    }
};

export default searchResultsReducer;