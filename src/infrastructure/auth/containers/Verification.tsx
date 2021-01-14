import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { verifyUser } from "../../../services";
import { AuthPages } from "../constants";

const DELAY_TIME = 3000;

const Verification = () => {
  const { userId, token } = useParams();
  const history = useHistory();
  const [isVerified, setVerified] = useState<boolean | null>(null);
  const [errorText, setErrorText] = useState("");

  const onVerifyUser = useCallback(async () => {
    if (userId && token) {
      try {
        const user = await verifyUser(userId, token);
        setVerified(user.isConfirmed);
      }
      catch (err) {
        const response = await err;
        if (response.status === 410) {
          setErrorText(response.message);
        }
        else {
          setErrorText("Verification was failed");
        }
      }
    }
  }, [token, userId]);

  const onSignIn = useCallback(() => {
    history.push(AuthPages.SignIn);
  }, [history]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onVerifyUser();
    }, DELAY_TIME);
    return () => clearTimeout(timer);
  }, [onVerifyUser]);

  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        history.push(AuthPages.SignIn);
      }, DELAY_TIME);
      return () => clearTimeout(timer);
    }
  }, [history, isVerified]);

  return (
    <Box width="100%" height="100%" p={1} alignItems="center" justifyContent="center" display="flex">
      <Card>
        <CardHeader
          title={errorText ? "Error" : "Verification"}
        />
        <CardContent>
          <Typography>
            {
              errorText
                ? errorText
                : isVerified
                  ? `You'll be redirected in ${DELAY_TIME / 1000} seconds`
                  : "Please, wait. You`ll be redirected to login page when your account is verified."
            }
          </Typography>
        </CardContent>
        {
          errorText
            ? (
              <CardActions>
                <Box display="flex" ml="auto">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onSignIn}
                  >
                    Sign In
                  </Button>
                  <Box ml={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={onVerifyUser}
                    >
                      Try again
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            )
            : null
        }
      </Card>
    </Box>
  );
};

export default Verification;
