export interface AppState {
  user: UserData | null;
  authenticationError: string | null;
  isAuthenticated?: boolean | null;
}
