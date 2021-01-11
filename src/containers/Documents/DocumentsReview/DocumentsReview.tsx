import React from "react";
import Box from "@material-ui/core/Box";
import DocumentsTable from "./DocumentsTable";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  actionButton: {
    display: "flex",
    marginLeft: "auto",
    marginTop: theme.spacing(2)
  }
}));

const DocumentsReview = () => {
  const classes = useStyles();

  return (
    <Box width="100%" height="100%" p={1} alignItems="center" justifyContent="center" display="flex">
      <Box width="50%">
        <DocumentsTable/>
        <Button
          variant="outlined"
          color="primary"
          classes={{ root: classes.actionButton }}
        >
          Add Document
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentsReview;
