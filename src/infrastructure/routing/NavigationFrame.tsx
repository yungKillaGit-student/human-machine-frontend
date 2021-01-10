import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { isAuthPath } from "../../helpers/auth";
import AuthRouting from "./AuthRouting";
import AppRouting from "./AppRouting";

const NavigationFrame = () => {
  const location = useLocation();
  const isAuth = useMemo(() => isAuthPath(location.pathname), [location]);

  if (isAuth) {
    return (
      <AuthRouting />
    );
  }

  return (
    <AppRouting/>
  );
};

export default NavigationFrame;
