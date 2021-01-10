import { User } from "./auth";

export interface AppState {
  user: User | null;
  authenticationError: string | null;
  isAuthenticated?: boolean | null;
}
