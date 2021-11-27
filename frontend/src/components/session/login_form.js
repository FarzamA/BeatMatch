import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.props.history.push('/profile');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  handleDemo(e) {
    e.preventDefault();
    let user = {
      email: 'flexmaster@gmail.com',
      password: 'flexitup'
    };

    this.props.login(user).then(() => this.props.history.push("/profile"));
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="session-form">
            <div className="session-form-heading">Login</div>
            <div className="session-input-container">
              <label className="form-label">Email</label>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
                className="session-form-input"
              />
              <label className="form-error">{this.state.errors.email}</label>
            </div>
            
            <div className="session-input-container">
              <label className="form-label">Password</label>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
                className="session-form-input"
              />
              <label className="form-error">{this.state.errors.password}</label>
            </div>
            
            <input className="session-submit-button" type="submit" value="Login" />
            <button onClick={this.handleDemo}>Demo User</button>
            <div className="alt-session-route">
              {this.props.navLink}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);