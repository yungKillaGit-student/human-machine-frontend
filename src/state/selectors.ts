import { AppState } from "../types/app";

export const getUser = (state: AppState) => state.user;
export const getAuthenticationError = (state: AppState) => state.authenticationError;
export const getAuthenticated = (state: AppState) => state.isAuthenticated;
