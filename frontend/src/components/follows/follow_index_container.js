import { connect } from "react-redux";
import FollowIndex from './follow_index';

const mSTP = state => {
    console.log('state', state);
    return {
        followers: state.entities.followers,
        following: state.entities.following
    }
};

// const mDTP = (dispatch) => ({
//     fetchUser: (username) => dispatch(fetchUser(username))
// })

export default connect(mSTP)(FollowIndex);