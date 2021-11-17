import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route, useLocation } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import UserProfileContainer from './profile/user_profile_container';
import HomeProfileContainer from './profile/home_profile_container';
import '../stylesheets/base.scss';
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/public'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
  })
}

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
          <ProtectedRoute path="/users/:username" component={UserProfileContainer} />
          <ProtectedRoute exact path="/profile" component={HomeProfileContainer} />
      </Switch>
    </div>
  );
  
};

export default App;