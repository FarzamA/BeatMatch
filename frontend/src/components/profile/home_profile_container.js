import { connect } from 'react-redux';
import { fetchPlaylistByUser, deleteUserPlaylist, fetchAddlPlaylistsByUser } from '../../actions/playlist_actions'
import { fetchUser } from '../../actions/user_actions';
import Profile from './profile';

const mapStateToProps = (state) => ({
    currentUser: state.session.user,
    user: state.entities.users[state.session.user.username],
    homeProfile: true,
    playlists: state.entities.playlists,
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.following)
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (username) => dispatch(fetchUser(username)),
    fetchPlaylistByUser: (userId, offset) => dispatch(fetchPlaylistByUser(userId, offset)),
    deleteUserPlaylist: (userId) => dispatch(deleteUserPlaylist(userId)),
    fetchAddlPlaylistsByUser: (userId, offset) => dispatch(fetchAddlPlaylistsByUser(userId,offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);