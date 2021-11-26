import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import SignupForm from './signup_form';

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    navLink: <Link to="/login">Already have an account?</Link>
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
