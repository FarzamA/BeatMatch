import React from 'react';
import { withRouter } from 'react-router-dom';

class MainPage extends React.Component {
  constructor(props){
    super(props);

    this.checkScrollPosition = this.checkScrollPosition.bind(this);
  }

  checkScrollPosition(){
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
  }

  render() {
    return (
      <div className="main-page">
        <div>This is the main page</div>
      </div>
    );
  }
}

export default withRouter(MainPage);