import React from "react";
import { makeStyles, Theme, Button, ButtonProps, CircularProgress } from "@material-ui/core";

const progressSize = 24;
const offset = -(progressSize / 2);

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    cursor: "pointer"
  },
  progress: {
    color: "#ffffff",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: offset,
    marginLeft: offset
  }
}));

export interface Props extends ButtonProps {
  busy?: boolean;
}

const ProgressButton = ({ busy, children, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} {...rest}>
      {children}
      {busy && <CircularProgress size={24} className={classes.progress} />}
    </Button>
  );
};

export default React.memo(ProgressButton);
