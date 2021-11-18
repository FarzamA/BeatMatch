import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import Burger from './burger';

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
});

export default withRouter(connect(mSTP, mDTP)(Burger))