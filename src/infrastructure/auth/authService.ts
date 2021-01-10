import { API_PATH } from "../../constants/api";
import { User } from "../../types/auth";
import { UserCreateDto } from "services/users/models";

let _isAuthenticated: boolean | null = null;

export const isAuthenticated = () => _isAuthenticated;

const CANT_CONNECT_TO_SERVER_ERROR = "The server may be experiencing problem.";

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = UnauthorizedError.name;
  }
}

export const authenticate = async (): Promise<User> => {
  let response;
  try {
    response = await fetch(`${API_PATH}/users/current`, {
      method: "GET"
    });
  }
  catch (err) {
    _isAuthenticated = false;
    throw new Error(CANT_CONNECT_TO_SERVER_ERROR);
  }

  if (response.ok) {
    const User: User = await response.json();
    _isAuthenticated = true;
    return User;
  }

  if (response.status === 401) {
    throw new UnauthorizedError("User unauthorized");
  }
  else if (response.status === 403) {
    throw new UnauthorizedError("Authorization token is outdated or not found");
  }
  else if (response.status === 404) {
    throw new UnauthorizedError("User not found");
  }
  else {
    throw new Error("Sorry, an unexpected error occurred. We couldn't get an user info.");
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  let response;
  try {
    response = await fetch(`${API_PATH}/users/signin`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
  }
  catch (err) {
    _isAuthenticated = false;
    throw new Error(CANT_CONNECT_TO_SERVER_ERROR);
  }

  if (response.ok) {
    const User: User = await response.json();
    _isAuthenticated = true;
    return User;
  }

  if (response.status === 404) {
    throw new UnauthorizedError("This email and password combination is incorrect");
  }
  if (response.status === 403) {
    throw new UnauthorizedError("User cannot login here");
  }
  else {
    throw new Error("Sorry, an unexpected error occurred. We couldn't sign in.");
  }
};

export const signUp = async (user: UserCreateDto): Promise<User> => {
  let response;
  try {
    response = await fetch(`${API_PATH}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
  }
  catch (err) {
    throw new Error(CANT_CONNECT_TO_SERVER_ERROR);
  }

  if (response.ok) {
    return response.json();
  }
  else {
    throw response;
  }
};

export const signOut = async () => {
  _isAuthenticated = false;
  if (!_isAuthenticated) return;

  let response;
  try {
    response = await fetch(`${API_PATH}/users/signout`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });
    _isAuthenticated = false;
  }
  catch (err) {
    _isAuthenticated = false;
    throw new Error(CANT_CONNECT_TO_SERVER_ERROR);
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new UnauthorizedError("User unauthorized");
    }
    else {
      _isAuthenticated = false;
      throw new Error("Sorry, an unexpected error occurred. We couldn't sign out.");
    }
  }
};
