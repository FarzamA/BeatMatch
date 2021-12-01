import { connect } from "react-redux";
import FollowIndex from './follow_index';
import { fetchUser } from "../../actions/user_actions";

const mSTP = state => {
    console.log('state', state);
    return {
        username: Object.keys(state.entities.users)[0],
        followers: state.entities.followers,
        following: state.entities.following
    }
};

const mDTP = (dispatch) => ({
    fetchUser: (username) => dispatch(fetchUser(username))
})

export default connect(mSTP, mDTP)(FollowIndex);