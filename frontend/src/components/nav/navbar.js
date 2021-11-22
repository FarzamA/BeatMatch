import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarContainer from '../search/search_bar_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="auth-links">
                <Link to={'/profile'}>Profile</Link>
                <div onClick={this.logoutUser}>Logout</div>
            </div>
        );
      } else {
        return (
            <div className="auth-links">
              <Link to={'/signup'}><div>SIGN UP</div></Link>
              <Link to={'/login'}><div>LOGIN</div></Link>
            </div>
        );
      }
  }

  render() {

    const { loggedIn, location } = this.props;

      let centralComponent;

      if (location.pathname !== "/") {
        centralComponent = (<SearchBarContainer/>);
      }

      return (
        <div className="navbar">
            <img className="logo" src="https://beatmatch-seeds.s3.amazonaws.com/BeatMatchFavicon.png"/>
            {centralComponent}
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;