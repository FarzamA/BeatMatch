import { connect } from "react-redux";
import UserDetailsBox from '../profile/user_details_box';
import { fetchUser } from '../../actions/user_actions';

const mSTP = state => ({
    currentUser: state.session.user,
    user: state.entities.users[state.session.user.username],
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.following)
});

const mDTP = dispatch => ({
    fetchUser: (username) => dispatch(fetchUser(username))
});

export default connect(mSTP, mDTP)(UserDetailsBox);