import React, { ReactNode } from "react";
import GridRow from "./GridRow";
import { Button, Grid } from "@material-ui/core";

interface Props {
  mainActionButton?: ReactNode;
  cancelActionButton?: ReactNode;
  mainAction?: () => void;
  cancelAction?: () => void;
}

const OkCancelButtons = ({
  mainActionButton,
  cancelActionButton,
  mainAction,
  cancelAction
}: Props) => {
  return (
    <>
      <GridRow label="" labelSize={6} childrenSize={3}>
        {
          mainActionButton ?? (
            <Button
              color="primary"
              variant="outlined"
              fullWidth={true}
              onClick={mainAction}
            >
              Ok
            </Button>
          )
        }
      </GridRow>
      <Grid xs={3} container item>
        {
          cancelActionButton ?? (
            <Button
              color="primary"
              variant="outlined"
              fullWidth={true}
              onClick={cancelAction}
            >
              Cancel
            </Button>
          )
        }
      </Grid>
    </>
  );
};

export default React.memo(OkCancelButtons);
