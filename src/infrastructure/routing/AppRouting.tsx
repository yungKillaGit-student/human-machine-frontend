import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AppContainer from "containers/AppContainer";
import { signInPath, signUpPath } from "../auth/constants";
import SignIn from "../auth/containers/SignIn";
import SignUp from "../auth/containers/SignUp";

const AppRouting = () => {
  return (
    <Switch>
      <Route exact path={signUpPath} component={SignUp}/>
      <Route exact path={signInPath} component={SignIn}/>
      <PrivateRoute exact path="/" component={AppContainer}/>
      <Redirect to="/"/>
    </Switch>
  );
};

export default AppRouting;
