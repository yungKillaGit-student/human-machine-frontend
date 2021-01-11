import React from "react";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { DOCUMENTS_SECTIONS } from "./Documents";
import RouterLink from "../../components/RouterLink";

const DocumentsCard = () => {
  return (
    <Card>
      <CardHeader
        title="Documents"
      />
      <CardContent>
        <Grid container spacing={2}>
          {
            DOCUMENTS_SECTIONS.map(x => {
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

export default DocumentsCard;
