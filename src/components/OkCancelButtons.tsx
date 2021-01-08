import React from "react";
import GridRow from "./GridRow";
import { Button, Grid } from "@material-ui/core";

interface Props {
  mainAction: () => void;
  cancelAction: () => void;
}

const OkCancelButtons = ({ mainAction, cancelAction }: Props) => {
  return (
    <>
      <GridRow label="" labelSize={6} childrenSize={3}>
        <Button
          color="primary"
          variant="outlined"
          fullWidth={true}
          onClick={mainAction}
        >
          Ok
        </Button>
      </GridRow>
      <Grid xs={3} container item>
        <Button
          color="primary"
          variant="outlined"
          fullWidth={true}
          onClick={cancelAction}
        >
          Cancel
        </Button>
      </Grid>
    </>
  );
};

export default React.memo(OkCancelButtons);
