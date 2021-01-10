import React, { useCallback, useMemo } from "react";
import { LoginInfoTextField } from "./LoginInfoEdit";
import GridRow from "components/GridRow";
import startCase from "lodash/startCase";
import { Box, Grid, TextField, Typography } from "@material-ui/core";
import OkCancelButtons from "components/OkCancelButtons";

interface Props {
  email?: string;
  formFields: Record<LoginInfoTextField, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: Record<string, string>;
  mainAction: () => void;
  cancelAction: () => void;
}

const LoginInfoEditContent = ({
  email,
  formFields,
  onChange,
  validation,
  mainAction,
  cancelAction
}: Props) => {
  const textBoxes = useMemo(() => {
    return Object.keys(formFields).map(textboxName => {
      return (
        <GridRow label={startCase(textboxName)} key={textboxName}>
          <Box width="100%" ml="auto">
            <TextField
              type="password"
              variant="outlined"
              error={!!validation[textboxName]}
              value={formFields[textboxName as LoginInfoTextField]}
              onChange={onChange}
              name={textboxName}
              fullWidth={true}
              helperText={validation[textboxName]}
            />
          </Box>
        </GridRow>
      );
    });
  }, [onChange, formFields, validation]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          {`E-Mail: ${email}`}
        </Typography>
      </Grid>
      { textBoxes }
      <OkCancelButtons
        mainAction={mainAction}
        cancelAction={cancelAction}
      />
    </Grid>
  );
};

export default React.memo(LoginInfoEditContent);
