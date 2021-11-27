import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

class MainPage extends React.Component {
  constructor(props){
    super(props);

    this.checkScrollPosition = this.checkScrollPosition.bind(this);
  }

  checkScrollPosition(){
    const mainPage = document.querySelector('.main-page');
    const mainPageContent = document.querySelector('.main-page-content');
    const bodyHeight = document.querySelector('body').scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    const scrollPercentage = scrollPosition / bodyHeight;
    const opacity = 1 - ((scrollPercentage - 0.6) * 2.5);

    mainPage.style.opacity = opacity;
    mainPageContent.style.opacity = opacity;
    

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.props.history.push({
          pathname: '/questions'
      });
    }
  }

  componentDidMount(){
    document.addEventListener('scroll', this.checkScrollPosition);
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.checkScrollPosition);
    const navbar = document.querySelector('.navbar');
    if(navbar){
      navbar.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  }

  render() {
    return (
      <div className="main-page">
        <div className="main-page-content">
          Beat Match
          <div className="main-page-about-link">
            <Link to={'/about'}><div>Meet the Team</div></Link>
          </div>
        </div>
        <div className="arrow">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    );
  }
}

export default withRouter(MainPage);