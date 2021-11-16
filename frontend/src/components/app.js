import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route, useLocation } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
<<<<<<< HEAD
import ProfileContainer from './profile/profile_container';
import QuestionsFormContainer from './questions_form/questions_form_container';
=======
import UserProfileContainer from './profile/user_profile_container';
import HomeProfileContainer from './profile/home_profile_container';
>>>>>>> 55dbfc07de6e80168be7db22229fea3ae2535bbf
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
<<<<<<< HEAD
          <ProtectedRoute path="/users/:username" component={ProfileContainer} />
          <ProtectedRoute exact path="/profile" component={ProfileContainer} />
          <ProtectedRoute exact path="/questions" component={QuestionsFormContainer} />
=======
          <ProtectedRoute path="/users/:username" component={UserProfileContainer} />
          <ProtectedRoute exact path="/profile" component={HomeProfileContainer} />
>>>>>>> 55dbfc07de6e80168be7db22229fea3ae2535bbf
      </Switch>
    </div>
  );
  
};

export default App;