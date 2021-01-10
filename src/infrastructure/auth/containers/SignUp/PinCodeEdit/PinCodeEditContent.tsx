import React from "react";
import { Grid, TextField } from "@material-ui/core";
import OkCancelButtons from "../../../../../components/OkCancelButtons";
import GridRow from "../../../../../components/GridRow";

interface Props {
  mainAction: () => void;
  cancelAction: () => void;
  pinCode: string;
  onChangePinCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const PinCodeEditContent = ({
  mainAction,
  cancelAction,
  pinCode,
  onChangePinCode,
  error
}: Props) => {
  return (
    <Grid container spacing={2}>
      <GridRow label="Enter PIN">
        <TextField
          variant="outlined"
          fullWidth={true}
          value={pinCode}
          onChange={onChangePinCode}
          error={!!error}
          helperText={error}
        />
      </GridRow>
      <OkCancelButtons
        mainAction={mainAction}
        cancelAction={cancelAction}
      />
    </Grid>
  );
};

export default PinCodeEditContent;
