import { connect } from 'react-redux';
import SearchBar from "./search_bar";
import { fetchSearchResults, clearSearchResults } from '../../actions/search_actions';

const mSTP = (state) => ({
    results: state.entities.searchResults
});

const mDTP = (dispatch) => ({
    fetchSearchResults: (query) => dispatch(fetchSearchResults(query)),
    clearSearchResults: () => dispatch(clearSearchResults)
});

export default connect(mSTP, mDTP)(SearchBar);