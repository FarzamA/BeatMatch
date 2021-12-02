import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import MainPage from './main/main_page';
import AboutPage from './about/about_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import QuestionsFormContainer from './questions_form/questions_form_container';
import UserProfileContainer from './profile/user_profile_container';
import HomeProfileContainer from './profile/home_profile_container';
import HamburgerSearch from './hamburger_search/hamburger_search';
import FeedPage from './feed/feed_page';
import FollowIndexContainer from './follows/follow_index_container';
import Footer from './footer/footer';
import '../stylesheets/base.scss';


const App = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <Link className="app-logo-link" to="/"><p className="navbar-text">BM</p></Link>
        {location.pathname === '/login' || location.pathname === '/signup' ? null : <HamburgerSearch/>}
      </header>
      <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/about" component={AboutPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
          <ProtectedRoute exact path="/questions" component={QuestionsFormContainer} />
          <ProtectedRoute path="/users/:username" component={UserProfileContainer} />
          <ProtectedRoute exact path="/profile" component={HomeProfileContainer} />
          <ProtectedRoute exact path="/feed" component={FeedPage} />
          <ProtectedRoute path="/:username/followers" component={FollowIndexContainer} />
          <ProtectedRoute path="/:username/following" component={FollowIndexContainer} />
      </Switch>
      <footer>
        {location.pathname === '/' || location.pathname === '/questions' || location.pathname === '/feed' ? null : <Footer/> }
      </footer>
    </div>
  );  
};

export default App;