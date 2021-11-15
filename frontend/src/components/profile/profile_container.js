import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    // the shape of these entities will change depending on how we set up state
    // (e.g. is it already an Array, or do we need to convert it from an
    //   Object to an Array?)
    user: state.entities.user[ownProps.match.params.userId],
    playlists: state.entities.playlists
  };
};

const mapDispatchToProps = (dispatch) => ({
  // placeholders until I know what these look like on the backend
  fetchUser: (userId) => console.log("Tried to fetch user " + userId),
  followUser: () => console.log("Tried to follow user")
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);