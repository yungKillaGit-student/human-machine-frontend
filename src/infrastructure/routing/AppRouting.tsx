import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AppContainer from "containers/AppContainer";
import { loginPath } from "../auth/constants";
import Login from "../auth/containers/Login";

const AppRouting = () => {
  return (
    <Switch>
      <Route exact path={loginPath} component={Login}/>
      <PrivateRoute exact path="/" component={AppContainer}/>
      <Redirect to="/"/>
    </Switch>
  );
};

export default AppRouting;
