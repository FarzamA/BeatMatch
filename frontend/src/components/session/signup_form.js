import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      let user = {
        email: this.state.email,
        password: this.state.password
      };

      this.props.login(user)
        .then(this.props.history.push('/'));
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
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

  handleDemo(e) {
    e.preventDefault();
    let user = {
      email: 'beatmaster@email.com',
      password: 'flexitup'
    };

    this.props.login(user).then(() => this.props.history.push("/profile"));
  }

  render() {
    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="session-form">
            <div className="session-form-heading">Sign Up</div>
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
              <label className="form-label">Username</label>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
                className="session-form-input"
              />
              <label className="form-error">{this.state.errors.username}</label>
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
            
            <div className="session-input-container">
              <label className="form-label">Confirm Password</label>
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
                className="session-form-input"
              />
              <label className="form-error">{this.state.errors.password2}</label>
            </div>
            
            <input className="session-submit-button" type="submit" value="Sign Up" />
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

export default withRouter(SignupForm);