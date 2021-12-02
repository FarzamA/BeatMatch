import { connect } from 'react-redux';
import { fetchUser, followUser, unfollowUser } from '../../actions/user_actions';
import { fetchPlaylistByUser, fetchAddlPlaylistsByUser } from '../../actions/playlist_actions';
import Profile from './profile';

const mapStateToProps = (state, ownProps) => {

  // NOTE: "user" refers to the user whose PROFILE you're visiting
  //        "currentUser" referes to the LOGGED IN user

  return {
    currentUser: state.session.user,
    user: state.entities.users[ownProps.match.params.username],
    playlists: state.entities.playlists,
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.following)
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (username) => dispatch(fetchUser(username)),
  followUser: (username, followData) => dispatch(followUser(username, followData)),
  unfollowUser: (username, followData) => dispatch(unfollowUser(username, followData)),
  fetchPlaylistByUser: (userId, offset) => dispatch(fetchPlaylistByUser(userId,offset)),
  fetchAddlPlaylistsByUser: (userId, offset) => dispatch(fetchAddlPlaylistsByUser(userId,offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);