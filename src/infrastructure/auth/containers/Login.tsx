import React, { ChangeEvent, FormEvent, useState, useCallback, useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { useDispatch } from "react-redux";
import { appActions } from "state/appState";

import { TextField, makeStyles, Box } from "@material-ui/core";

import * as authService from "../authService";

import ErrorBlock from "components/ErrorBlock";
import ProgressButton from "components/ProgressButton";
import Password from "../components/Password";

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    form: {
      width: 320,
      height: "auto",
      borderStyle: "solid",
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
      borderRadius: 4,
      padding: "24px 24px 56px 24px"
    },
    label: {
      fontWeight: "bold",
      fontSize: 12,
      lineHeight: "16px",
      letterSpacing: "0.4px"
    }
  });
});

interface ValidationResults {
  [key: string]: string;
}

const Login = (props: RouteComponentProps) => {
  const classes = useStyles();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validation, setValidation] = useState<ValidationResults>({});
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [executing, setExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUserError, setUserError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      dispatch(appActions.logout());
    }
    catch (err) {
      console.error(err.message);
    }
  }, [dispatch]);

  const validateInputs = useCallback(() => {
    const validation: ValidationResults = {};

    if (!userName) {
      validation.email = "Please provide your username";
    }

    if (!password) {
      validation.password = "Please provide your password";
    }

    if (Object.keys(validation).length > 0) {
      setValidation(validation);
      return false;
    }

    return true;
  }, [userName, password]);

  const onLogin = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateInputs()) {
      return;
    }

    if (authService.isAuthenticated()) {
      logout();
    }

    const { history, location } = props;

    setExecuting(true);
    try {
      const user = await authService.login(userName, password);
      dispatch(appActions.login(user));

      setExecuting(false);
      setValidation({});
      setError(null);

      const locationState: any = location.state;
      const { from } = (locationState && locationState.from ? locationState : { from: { pathname: "/" } });
      const fromState = locationState?.from.state;
      history.replace(from, fromState);
    }
    catch (err) {
      setExecuting(false);
      setValidation({});
      setError(err.message);
      setUserError(err instanceof authService.UnauthorizedError);
    }
  }, [validateInputs, props, logout, userName, password, dispatch]);

  const onChangeUserName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setValidation({});
    setError(null);
    setUserError(false);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
    setValidation({});
    setError(null);
    setUserError(false);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onLogin}>
        <label className={classes.label}>Username:</label>
        <TextField
          error={validation.email != null}
          value={userName}
          onChange={onChangeUserName}
          id="email"
          variant="outlined"
          fullWidth
          margin="dense"
          disabled={executing}
          helperText={validation.email}
        />

        <Box marginTop={4} display="flex" alignItems="flex-end">
          <label className={classes.label}>Password:</label>
        </Box>
        <Password
          id="password"
          error={validation.password}
          showPassword={passwordVisibility}
          disabled={executing}
          onChange={onChangePassword}
          onTogglePasswordVisibility={togglePasswordVisibility}
        />

        {error &&
          <Box marginTop={4} marginBottom={1} >
            <ErrorBlock error={error} />
          </Box>
        }

        <Box marginTop={4}>
          <ProgressButton
            color="primary"
            variant="outlined"
            type="submit"
            busy={executing}
            disabled={executing}
          >
            {error && !isUserError ? "Try again" : "Login"}
          </ProgressButton>
        </Box>
      </form>
    </div>
  );
};

export default Login;
