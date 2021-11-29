import { connect } from 'react-redux';
import SearchBar from "./search_bar";
import { fetchSearchResults, clearSearchResults } from '../../actions/search_actions';
import { withRouter } from 'react-router-dom';

const mSTP = (state, ownProps) => ({
    results: state.entities.searchResults,
    searchClicked: ownProps.searchClicked,
    clearSearch: ownProps.clearSearch
});

const mDTP = (dispatch) => ({
    fetchSearchResults: (query) => dispatch(fetchSearchResults(query)),
    clearSearchResults: () => dispatch(clearSearchResults),
});

export default withRouter(connect(mSTP, mDTP)(SearchBar));