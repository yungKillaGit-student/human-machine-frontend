import React from "react";

import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import DocumentsCard from "../Documents/DocumentsCard";
import EventsCard from "../Events/EventsCard";
import UsersCard from "../Users/UsersCard";

const Home = () => {
  return (
    <Box width="100%" height="100%" p={1} alignItems="center" justifyContent="center" display="flex">
      <Box width="80%">
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
