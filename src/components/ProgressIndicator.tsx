import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

const ProgressIndicator = () => (
  <Box height="100%" display="flex" alignItems="center" justifyContent="center">
    <CircularProgress/>
  </Box>
);

export default ProgressIndicator;
