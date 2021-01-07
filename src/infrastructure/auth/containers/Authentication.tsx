import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import * as authService from "../authService";
import { appActions } from "state/appState";
import { getAuthenticated, getAuthenticationError } from "state/selectors";
import ProgressIndicator from "components/ProgressIndicator";

const authenticate = async (dispatch: Dispatch<any>) => {
  try {
    const user = await authService.authenticate();
    dispatch(appActions.login(user));
  }
  catch (err) {
    if (err instanceof authService.UnauthorizedError) {
      dispatch(appActions.logout());
    }
    else {
      dispatch(appActions.setAuthenticationError(err.message || err));
    }
  }
};

interface Props {
  children: React.ReactNode;
}

const Authentication = ({ children }: Props) => {
  const isAuthenticated = useSelector(getAuthenticated);
  const authenticationError = useSelector(getAuthenticationError);

  const dispatch = useDispatch();

  useEffect(() => {
    authenticate(dispatch);
  }, [authenticationError, dispatch]);

  if (authenticationError) {
    return <div>{authenticationError}</div>;
  }
  else if (isAuthenticated === null) {
    return <ProgressIndicator/>;
  }
  else {
    return <>{children}</>;
  }
};

export default Authentication;
