import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { isAuthenticated } from "../auth/authService";
import { signInPath } from "../auth/constants";

const PrivateRoute = ({ children, component: Component, render, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated()) {
          return <Redirect to={{ pathname: signInPath, state: { from: props.location } }} />;
        }

        if (Component) {
          return <Component {...props} />;
        }
        else if (render) {
          return render(props);
        }
        else {
          return children;
        }
      }}
    />
  );
};

export default PrivateRoute;
