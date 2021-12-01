import React from 'react';
import { Link } from 'react-router-dom';

class BurgerLinks extends React.Component {

    constructor(props) {
        super(props);

        this.bindFuncs();
    }

    bindFuncs() {
        this.logoutUser = this.logoutUser.bind(this);
        this.loginDemo = this.loginDemo.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }


    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    loginDemo(e) {
        e.preventDefault();
        this.props.loginDemo();
    }

    getLinks() {

        const { transformBurger } = this.props;

        if (this.props.loggedIn) {
            return (
                <div className="burger-links">
                    <Link to='/profile' onClick={transformBurger}><p>Profile</p></Link>
                    <Link to="/questions" onClick={transformBurger}><p>Make New Playlist</p></Link>
                    <Link to='/feed' onClick={transformBurger}><p>Feed</p></Link>
                    <Link to="/about" onClick={transformBurger}><p>About Us</p></Link>
                    <div onClick={this.logoutUser}><p>Logout</p></div>
                </div>
            );
      } else {
            return (
                <div className="burger-links">
                    <Link to={'/signup'} onClick={transformBurger}><p>Signup</p></Link>
                    <Link to={'/login'} onClick={transformBurger}><p>Login</p></Link>
                    <div onClick={this.loginDemo}><p>Login as DEMO</p></div>
                    <Link to="/about" onClick={transformBurger}><p>About Us</p></Link>
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