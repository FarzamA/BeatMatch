import React from 'react';
import { Link } from 'react-router-dom';

class BurgerLinks extends React.Component {

    constructor(props) {
        super(props);

        this.bindFuncs();
    }

    bindFuncs() {
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
                <div className="burger-links">
                    <Link to={'/profile'}><p>Profile</p></Link>
                    <div onClick={this.logoutUser}><p>Logout</p></div>
                    <Link to="/"><p>Make New Playlist</p></Link>
                </div>
            );
      } else {
            return (
                <div className="burger-links">
                    <Link to={'/signup'}><p>Signup</p></Link>
                    <Link to={'/login'}><p>Login</p></Link>
                    <Link to="/"><p>Make New Playlist</p></Link>
                </div>
            );
      } 
    }

    render() {

        const { burgerClicked } = this.props;

        return (
            <div className={`burger-links-container ${burgerClicked}`}>
                {this.getLinks()}
            </div>
        )
    }

};

export default BurgerLinks;