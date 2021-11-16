import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import Profile from './profile';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    // the shape of these entities will change depending on how we set up state
    // (e.g. is it already an Array, or do we need to convert it from an
    //   Object to an Array?)
    // user: state.entities.users[ownProps.match.params.username],
    user: state.entities.users,
    playlists: state.entities.playlists,
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.following)
  };
};

const mapDispatchToProps = (dispatch) => ({
  // placeholders until I know what these look like on the backend
  fetchUser: (username) => dispatch(fetchUser(username)),
  followUser: () => console.log("Tried to follow user"),
  unfollowUser: () => console.log("Tried to unfollow user")
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);