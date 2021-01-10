import { AuthPages } from "../infrastructure/auth/constants";

export function isAuthPath(path: string): boolean {
  if (!path)
    return false;

  const keys = Object.keys(AuthPages);

  for (const key of keys) {
    const link = AuthPages[key];
    if (link.toLowerCase() === path.toLowerCase()) {
      return true;
    }
  }

  return false;
}
