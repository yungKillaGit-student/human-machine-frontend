import React from "react";
import { TextField } from "@material-ui/core";
import { InputProps as StandardInputProps } from "@material-ui/core/Input/Input";
import LabelWrapper from "./LabelWrapper";

interface Props {
  label?: string;
  disabled?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  direction?: "row" | "column";
  controlClassName?: string;
  labelClassName?: string;
  isFullWidth?: boolean;
  isMultiline?: boolean;
  onChangeCallback?: (event: any) => void;
  value?: any;
  InputProps?: Partial<StandardInputProps>;
}

const TextBox = ({
  label,
  disabled,
  onChangeCallback,
  labelPlacement,
  direction,
  value,
  InputProps,
  controlClassName,
  labelClassName,
  isMultiline,
  isFullWidth = true
}: Props) => {
  return (
    <LabelWrapper
      disabled={disabled}
      labelPlacement={labelPlacement}
      label={label}
      direction={direction}
      controlClassName={controlClassName}
      labelClassName={labelClassName}
      isFullWidth={isFullWidth}
    >
      <TextField
        variant="outlined"
        value={value ?? ""}
        onChange={onChangeCallback}
        InputProps={InputProps}
        fullWidth={isFullWidth}
        multiline={isMultiline}
      />
    </LabelWrapper>
  );
};

export default React.memo(TextBox);
