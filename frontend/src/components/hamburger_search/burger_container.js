import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout, login } from "../../actions/session_actions";
import Burger from './burger';
import { activateBurgerModal, deactivateBurgerModal } from "../../actions/burger_modal_actions";

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    loginDemo: () => dispatch(login({email: 'flexmaster@gmail.com', password: 'flexitup'})),
    activateBurgerModal: () => dispatch(activateBurgerModal),
    deactivateBurgerModal: () => dispatch(deactivateBurgerModal)
});

export default withRouter(connect(mSTP, mDTP)(Burger))