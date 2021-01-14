import React, { useCallback } from "react";

import Box from "@material-ui/core/Box";
import { Button, Grid, Typography } from "@material-ui/core";
import DocumentsCard from "../Documents/DocumentsCard";
import EventsCard from "../Events/EventsCard";
import UsersCard from "../Users/UsersCard";
import { useSelector } from "react-redux";
import { getUser } from "../../state/selectors";
import { useHistory } from "react-router-dom";
import { AuthPages } from "../../infrastructure/auth/constants";

const Home = () => {
  const history = useHistory();
  const user = useSelector(getUser);

  const onSignOut = useCallback(() => {
    history.push(AuthPages.SignIn);
  }, [history]);

  return (
    <Box width="100%" height="100%" p={1} alignItems="center" justifyContent="center" display="flex">
      <Box width="80%">
        <Box display="flex">
          <Box mb={5} ml="auto">
            <Box display="flex">
              <Typography>
                { `Welcome, ${user?.firstName}` }
              </Typography>
              <Box ml={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={onSignOut}
                >
                  Sign Out
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <UsersCard/>
          </Grid>
          <Grid item xs={4}>
            <EventsCard/>
          </Grid>
          <Grid item xs={4}>
            <DocumentsCard/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
