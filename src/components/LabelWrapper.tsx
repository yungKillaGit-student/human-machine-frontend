import React, { cloneElement, ReactElement } from "react";

import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Theme, useTheme } from "@material-ui/core";

const useStyles = (labelPlacement?: "end" | "start" | "top" | "bottom", isFullWidth?: boolean) => makeStyles((theme: Theme) => ({
  labelTop: {
    marginLeft: 0
  },
  labelStart: {
    marginLeft: 0
  },
  labelEnd: {
    marginLeft: theme.spacing(1)
  },
  label: {
    marginRight: "auto"
  },
  root: {
    marginLeft: 0,
    width: isFullWidth ? "100%" : undefined
  }
}));

export interface Props {
  label?: string;
  disabled?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  direction?: "row" | "column";
  controlClassName?: string;
  labelClassName?: string;
  isFullWidth?: boolean;
  children: ReactElement;
}

const LabelWrapper = ({
  label,
  disabled,
  labelPlacement,
  direction,
  children,
  controlClassName,
  labelClassName,
  isFullWidth
}: Props) => {
  const classes = useStyles(labelPlacement, isFullWidth)();
  const theme = useTheme();

  const controlStyle: any = {};
  if (label && !labelPlacement) {
    controlStyle.marginTop = theme.spacing(2);
  }
  else if (label && labelPlacement === "top") {
    controlStyle.marginTop = theme.spacing(2);
  }
  else if (label && labelPlacement === "end") {
    controlStyle.marginLeft = theme.spacing(2);
  }
  else if (label && labelPlacement === "start") {
    controlStyle.marginLeft = theme.spacing(2);
  }

  const ControlElement = cloneElement(children, { style: controlStyle });

  return (
    <Box display="flex" flexDirection={direction ?? "row"} className={controlClassName}>
      <FormControlLabel
        control={ControlElement}
        label={label ?? ""}
        labelPlacement={labelPlacement ?? "top"}
        disabled={disabled}
        classes={{
          labelPlacementTop: classes.labelTop,
          label: labelClassName ?? classes.label,
          labelPlacementStart: classes.labelStart,
          root: classes.root
        }}
      />
    </Box>
  );
};

export default React.memo(LabelWrapper);
