import { connect } from "react-redux";
import { fetchInitialFeedPlaylists, fetchAddlFeedPlaylists } from '../../actions/feed_playlist_actions';
import FeedIndex from './feed_index';

const mSTP = state => ({
    currentUser: state.session.user,
    feedPlaylists: state.entities.feedPlaylists
});

const mDTP = dispatch => ({
    fetchInitialFeedPlaylists: (username, offset) => dispatch(fetchInitialFeedPlaylists(username, offset)),
    fetchAddlFeedPlaylists: (username, offset) => dispatch(fetchAddlFeedPlaylists(username, offset))
});

export default connect(mSTP, mDTP)(FeedIndex);