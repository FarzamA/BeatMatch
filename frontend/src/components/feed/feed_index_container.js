import { connect } from "react-redux";
import { fetchFeedPlaylists } from '../../actions/feed_playlist_actions';
import FeedIndex from './feed_index';

const mSTP = state => ({
    currentUser: state.session.user,
    feedPlaylists: state.entities.feedPlaylists
});

const mDTP = dispatch => ({
    fetchFeedPlaylists: (username, offset) => dispatch(fetchFeedPlaylists(username, offset))
});

export default connect(mSTP, mDTP)(FeedIndex);