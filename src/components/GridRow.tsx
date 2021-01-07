import React, { ReactNode } from "react";
import { Grid, GridSize, Typography } from "@material-ui/core";

interface Props {
  label: string;
  labelSize?: GridSize;
  children: ReactNode;
  childrenSize?: GridSize;
  visible?: boolean | string;
}

const GridRow = ({
  label,
  labelSize = 4,
  childrenSize = 8,
  visible = true,
  children
}: Props) => {
  if (visible) {
    return (
      <>
        <Grid container item xs={labelSize}>
          <Typography>
            { label }
          </Typography>
        </Grid>
        <Grid container item xs={childrenSize}>
          { children }
        </Grid>
      </>
    );
  }
  else {
    return null;
  }
};

export default React.memo(GridRow);
