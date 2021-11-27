import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div>BeatMatch 2021</div>
            <div className="footer-repo-link">
                <a target="_blank" href="https://github.com/FarzamA/BeatMatch"><i className="fab fa-github"></i></a>
            </div>
            <div>
                <Link to='/about'>About Us</Link>
            </div>
        </div>
    );
}

export default Footer;