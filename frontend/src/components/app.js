import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route, useLocation } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import '../stylesheets/base.scss';

const App = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        {location.pathname === '/login' || location.pathname === '/signup' ? null : <NavBarContainer />}
      </header>
      <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
          <ProtectedRoute path="/users/:username" component={ProfileContainer} />
          <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      </Switch>
    </div>
  );
  
};

export default App;