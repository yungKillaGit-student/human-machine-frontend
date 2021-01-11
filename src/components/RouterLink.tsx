import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    color: "black",
    textDecoration: "none"
  }
}));

interface Props {
  children: string;
  to: {
    pathname: string;
    state?: any;
  } | string;
  canNavigate?: boolean;
}

const RouterLink = ({
  children,
  to,
  canNavigate = true
}: Props) => {
  const classes = useStyles();

  return (
    <Link to={canNavigate ? to : "#"} className={classes.root}>
      <Typography>
        { children }
      </Typography>
    </Link>
  );
};

export default React.memo(RouterLink);
