import React, { useCallback, ChangeEvent } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface Props {
  id?: string;
  error?: string | null;
  showPassword: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onTogglePasswordVisibility?: () => void;
}

const Password = ({
  id,
  error,
  showPassword = false,
  disabled = false,
  onChange = f => f,
  onTogglePasswordVisibility = () => null
}: Props) => {
  const onChangeCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);
  const onToggleCallback = useCallback(() => onTogglePasswordVisibility(), [onTogglePasswordVisibility]);

  return (
    <TextField
      error={error != null}
      onChange={onChangeCallback}
      id={id}
      type={showPassword ? "text" : "password"}
      variant="outlined"
      fullWidth
      margin="dense"
      disabled={disabled}
      helperText={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton tabIndex={-1}
              color="primary"
              aria-label="toggle password visibility"
              edge="end"
              onClick={onToggleCallback}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default React.memo(Password);
