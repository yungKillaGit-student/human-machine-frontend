import React, { useCallback } from "react";
import { TextFieldName } from "../SignUp";
import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import startCase from "lodash/startCase";

interface Props {
  formFields: Record<TextFieldName, string>;
}

const ProfileInformation = ({
  formFields
}: Props) => {
  const renderInfoLabels = useCallback((textFields: string[]) => {
    return textFields.map(textFieldName => {
      let labelText = `${startCase(textFieldName)}:`;
      if (formFields[textFieldName as TextFieldName] && textFieldName !== "password") {
        labelText = `${labelText} ${formFields[textFieldName as TextFieldName]}`;
      }
      if (textFieldName === "password") {
        labelText = `${labelText} ${"*".repeat(formFields.password.length)}`;
      }
      return (
        <Grid item xs={12} key={textFieldName}>
          <Typography>
            { labelText }
          </Typography>
        </Grid>
      );
    });
  }, [formFields]);

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Login information"
            action={
              <IconButton>
                <EditIcon/>
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              { renderInfoLabels(["email", "password"]) }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Profile information"
            action={
              <IconButton>
                <EditIcon/>
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              { renderInfoLabels(["firstName", "lastName", "country", "about"]) }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Personal Identification Number"
            action={
              <IconButton>
                <EditIcon/>
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex">
                  <Box>
                    <Typography>PIN:</Typography>
                  </Box>
                  <Box ml="auto">
                    <Button
                      variant="contained"
                    >
                      Set PIN
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default React.memo(ProfileInformation);
