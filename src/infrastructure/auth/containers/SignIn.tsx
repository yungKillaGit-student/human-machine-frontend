import React, { ChangeEvent, FormEvent, useState, useCallback, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { appActions } from "state/appState";

import { TextField, makeStyles, Box, Grid, Button, Link } from "@material-ui/core";

import * as authService from "../authService";

import ErrorBlock from "components/ErrorBlock";
import ProgressButton from "components/ProgressButton";
import Password from "../components/Password";
import GridRow from "../../../components/GridRow";
import { signUpPath } from "../constants";
import { useRequiredFieldsValidation } from "../../../hooks/useRequiredFieldsValidation";

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    form: {
      width: 500,
      height: "auto",
      padding: "24px 24px 56px 24px"
    },
    link: {
      color: "black"
    }
  });
});

interface ValidationResults {
  [key: string]: string;
}

const SignIn = (props: RouteComponentProps) => {
  const classes = useStyles();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validation, setValidation] = useState<ValidationResults>({});
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [executing, setExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUserError, setUserError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const logout = useCallback(async () => {
    try {
      await authService.signOut();
      dispatch(appActions.logout());
    }
    catch (err) {
      console.error(err.message);
    }
  }, [dispatch]);

  const getValidationResult = useRequiredFieldsValidation();

  const validateInputs = useCallback(() => {
    const validation = getValidationResult({ email, password });

    if (Object.keys(validation).length > 0) {
      setValidation(validation);
      return false;
    }

    return true;
  }, [email, getValidationResult, password]);

  const onSignIn = useCallback(async (e: FormEvent<HTMLFormElement>) => {
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
      const user = await authService.signIn(email, password);
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
  }, [validateInputs, props, logout, email, password, dispatch]);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
      <form className={classes.form} onSubmit={onSignIn}>
        <Grid container spacing={2}>
          <GridRow label="E-Mail">
            <TextField
              error={!!validation.email}
              value={email}
              onChange={onChangeEmail}
              id="email"
              variant="outlined"
              fullWidth
              margin="dense"
              disabled={executing}
              helperText={validation.email}
            />
          </GridRow>
          <GridRow label="Password">
            <Password
              id="password"
              error={validation.password}
              showPassword={passwordVisibility}
              disabled={executing}
              onChange={onChangePassword}
              onTogglePasswordVisibility={togglePasswordVisibility}
            />
          </GridRow>
          <GridRow label="" labelSize={9} childrenSize={3}>
            <Box marginTop={4} ml="auto" width="100%">
              <ProgressButton
                color="primary"
                variant="outlined"
                type="submit"
                busy={executing}
                disabled={executing}
                fullWidth={true}
              >
                {error && !isUserError ? "Try again" : "Sign In"}
              </ProgressButton>
            </Box>
          </GridRow>
          <GridRow label="" labelSize={9} childrenSize={3}>
            <Box marginTop={4} ml="auto" width="100%">
              <Button
                color="primary"
                variant="outlined"
                disabled={executing}
                fullWidth={true}
              >
                <Link
                  tabIndex={-1}
                  component={RouterLink}
                  to={signUpPath}
                  underline="none"
                  classes={{ root: classes.link }}
                >
                  Sign Up
                </Link>
              </Button>
            </Box>
          </GridRow>
        </Grid>

        <Box marginTop={4} marginBottom={1} visibility={error ? "visible" : "hidden"}>
          <ErrorBlock error={error ?? ""} />
        </Box>
      </form>
    </div>
  );
};

export default SignIn;
