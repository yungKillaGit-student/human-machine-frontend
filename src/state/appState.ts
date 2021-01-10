import { AnyAction } from "redux";

import { AppState } from "../types/app";
import { User } from "../types/auth";

const actions = {
  SET_AUTHENTICATION_ERROR: "SET_AUTHENTICATION_ERROR",
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
  SET_USER: "SET_USER"
};

export const appActions = {
  setAuthenticationError: (error: string | null) => ({ type: actions.SET_AUTHENTICATION_ERROR, error }),
  login: (user: User) => ({ type: actions.LOG_IN, user }),
  logout: () => ({ type: actions.LOG_OUT }),
  setUser: (user: User) => ({ type: actions.SET_USER, user })
};

const initialState: AppState = {
  user: null,
  authenticationError: null,
  isAuthenticated: null
};

export const reducer = (state: AppState = initialState, action: AnyAction): AppState => {
  switch (action.type) {
    case actions.SET_AUTHENTICATION_ERROR: {
      return {
        ...state,
        authenticationError: action.error
      };
    }

    case actions.LOG_IN: {
      return {
        ...state,
        authenticationError: null,
        user: action.user,
        isAuthenticated: true
      };
    }

    case actions.LOG_OUT: {
      return {
        ...state,
        authenticationError: null,
        user: null,
        isAuthenticated: false
      };
    }

    case actions.SET_USER: {
      return {
        ...state,
        user: action.user
      };
    }

    default: {
      return state;
    }
  }
};
