import React from "react";
import { Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Home from "../../containers/Home";
import Documents from "../../containers/Documents";
import Events from "../../containers/Events";
import Users from "../../containers/Users";

const AppRouting = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home}/>
      <Users/>
      <Events/>
      <Documents/>
      <Redirect to="/"/>
    </Switch>
  );
};

export default AppRouting;
