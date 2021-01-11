import React from "react";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { USERS_SECTIONS } from "./Users";
import RouterLink from "../../components/RouterLink";

const EventsCard = () => {
  return (
    <Card>
      <CardHeader
        title="Users"
      />
      <CardContent>
        <Grid container spacing={2}>
          {
            USERS_SECTIONS.map(x => {
              return (
                <Grid key={x.link} item xs={12}>
                  <RouterLink to={x.link}>
                    { x.text }
                  </RouterLink>
                </Grid>
              );
            })
          }
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
