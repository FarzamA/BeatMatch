import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route, useLocation } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import QuestionsFormContainer from './questions_form/questions_form_container';
import UserProfileContainer from './profile/user_profile_container';
import HomeProfileContainer from './profile/home_profile_container';
import '../stylesheets/base.scss';
import HamburgerSearch from './hamburger_search/hamburger_search';


const App = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        {location.pathname === '/login' || location.pathname === '/signup' ? null : <NavBarContainer />}
        {location.pathname === '/login' || location.pathname === '/signup' ? null : <HamburgerSearch/>}
      </header>
      <Switch>
          <Route exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
          <ProtectedRoute exact path="/questions" component={QuestionsFormContainer} />
          <ProtectedRoute path="/users/:username" component={UserProfileContainer} />
          <ProtectedRoute exact path="/profile" component={HomeProfileContainer} />
      </Switch>
    </div>
  );
  
};

export default App;