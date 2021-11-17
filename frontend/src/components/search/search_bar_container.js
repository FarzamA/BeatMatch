import { connect } from 'react-redux';
import SearchBar from "./search_bar";

const mSTP = (state) => ({
    search: state.entities.searchResults
});

const mDTP = (dispatch) => ({
    fetchSearchResults: (query) => dispatch(fetchSearchResults(query))
});

export default connect(mSTP, mDTP)(SearchBar);