import React from "react";
import { Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Home from "containers/Home";

const AppRouting = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home}/>
      <Redirect to="/"/>
    </Switch>
  );
};

export default AppRouting;
