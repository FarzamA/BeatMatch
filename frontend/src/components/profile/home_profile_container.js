import { connect } from 'react-redux';
import { fetchUser, followUser, unfollowUser } from '../../actions/user_actions';
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
    fetchUser: (username) => dispatch(fetchUser(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);