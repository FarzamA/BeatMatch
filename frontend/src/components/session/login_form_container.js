import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { Link, withRouter  } from 'react-router-dom';
import LoginForm from './login_form';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    navLink: <Link to="/signup">Create an account</Link>
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));