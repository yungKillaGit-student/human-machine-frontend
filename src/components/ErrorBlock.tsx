import React from "react";
import { Box, Typography } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  errorBox: {
    backgroundColor: "rgba(211, 47, 47, 0.08)",
    color: theme.palette.error.main,
    borderRadius: theme.shape.borderRadius
  },

  errorIcon: {
    color: theme.palette.error.main
  }
}));

interface Props {
  error: string;
}

const ErrorBlock = ({ error }: Props) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.errorBox}
      paddingLeft={3}
      paddingTop={2}
      paddingRight={3}
      paddingBottom={2}
      display="flex">
      <Box marginRight={3}>
        <ErrorOutlineIcon fontSize="small" className={classes.errorIcon} />
      </Box>
      <Typography variant="body1">{error}</Typography>
    </Box>
  );
};

export default ErrorBlock;
