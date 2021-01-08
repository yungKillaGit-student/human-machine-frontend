import React, { ReactNode, useCallback } from "react";
import FocusLock, { MoveFocusInside } from "react-focus-lock";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = (width?: number, height?: number) => makeStyles(() => {
  return ({
    closeIcon: {
      color: "rgb(0,0,0)"
    },
    paper: {
      minWidth: width || 400,
      minHeight: height
    }
  });
});

interface Props {
  outsideClasses?: any;
  title: string;
  content: string | ReactNode;
  mainActionButton?: ReactNode;
  cancelText?: string;
  cancelButtonColor?: "inherit" | "default" | "primary" | "secondary";
  width?: number;
  height?: number;
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  open: boolean;
  onClose: (dialogResult: any) => void;
}

const DialogTemplate = ({
  title,
  content,
  mainActionButton,
  cancelText,
  cancelButtonColor,
  width,
  height,
  showCloseButton = true,
  showCancelButton,
  open,
  onClose,
  outsideClasses
}: Props) => {
  const classes = useStyles(width, height)();
  const cancelCallback = useCallback(() => onClose(null), [onClose]);

  const CancelButton = (
    <Button
      variant={"contained"}
      color={cancelButtonColor || "default"}
      onClick={cancelCallback}
    >
      {cancelText ? cancelText : "Cancel"}
    </Button>
  );

  const CancelButtonWithFocus = !mainActionButton
    ? (
      <MoveFocusInside>
        {CancelButton}
      </MoveFocusInside>
    )
    : CancelButton;

  return (
    <FocusLock>
      <Dialog open={open} classes={{ paper: classes.paper }}>
        <DialogTitle>
          <Box display="flex">
            <Typography>
              {title}
            </Typography>
            {showCloseButton &&
              <Box ml="auto" mt={-1.5} mr={-1.5}>
                <IconButton tabIndex={-1} aria-label="close" onClick={cancelCallback}>
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              </Box>
            }
          </Box>
        </DialogTitle>
        <DialogContent classes={outsideClasses?.dialogContent}>
          {typeof content === "string"
            ? <DialogContentText>{content}</DialogContentText>
            : content
          }
        </DialogContent>
        <DialogActions>
          {showCancelButton && CancelButtonWithFocus}
          {mainActionButton &&
            <MoveFocusInside>
              {mainActionButton}
            </MoveFocusInside>
          }
        </DialogActions>
      </Dialog>
    </FocusLock>
  );
};

export default DialogTemplate;
