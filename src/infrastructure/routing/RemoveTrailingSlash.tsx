import React from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const RemoveTrailingSlash = ({ children }: Props) => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route render={() => children} />
    </Switch>
  );
};

export default RemoveTrailingSlash;
