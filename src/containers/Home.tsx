import React, { useCallback, useState } from "react";

import Box from "@material-ui/core/Box";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cardHeader: {
    background: "#ace"
  }
}));

const Home = () => {
  const classes = useStyles();

  const renderDefaultActions = useCallback((sectionName: string) => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Browse
        </Grid>
        <Grid item xs={12}>
          Create
        </Grid>
        <Grid item xs={12}>
          Assign
        </Grid>
      </Grid>
    );
  }, []);

  return (
    <Box width="100%" height="100%" p={1} alignItems="center" justifyContent="center" display="flex">
      <Box width="80%">
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                title="Users"
                classes={{ root: classes.cardHeader }}
              />
              <CardContent>
                { renderDefaultActions("users") }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                title="Events"
                classes={{ root: classes.cardHeader }}
              />
              <CardContent>
                { renderDefaultActions("events") }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                title="Documents"
                classes={{ root: classes.cardHeader }}
              />
              <CardContent>
                { renderDefaultActions("documents") }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
