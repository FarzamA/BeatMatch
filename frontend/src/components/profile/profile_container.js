import { connect } from 'react-redux';
import { fetchUser, followUser, unfollowUser } from '../../actions/user_actions';
import Profile from './profile';

const mapStateToProps = (state, ownProps) => {

  // NOTE: "user" refers to the user whose PROFILE you're visiting
  //        "currentUser" referes to the LOGGED IN user

  return {
    currentUser: state.session.user,
    // the shape of these entities will change depending on how we set up state
    // (e.g. is it already an Array, or do we need to convert it from an
    //   Object to an Array?)
    // user: state.entities.users[ownProps.match.params.username],
    user: state.entities.users[ownProps.match.params.username],
    playlists: state.entities.playlists,
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.following)
  };
};

const mapDispatchToProps = (dispatch) => ({
  // placeholders until I know what these look like on the backend
  fetchUser: (username) => dispatch(fetchUser(username)),
  followUser: (username, followData) => dispatch(followUser(username, followData)),
  unfollowUser: (username, followData) => dispatch(unfollowUser(username, followData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);