import React, { useCallback } from "react";

import { Button, Box, makeStyles, Theme } from "@material-ui/core";
import SuccessIcon from "@material-ui/icons/CheckCircleOutline";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import {
  DialogProps, AlertDialogConfig, ErrorDialogConfig, WarningDialogConfig,
  ConfirmDialogConfig, DeleteDialogConfig, SuccessDialogConfig
} from "../types";
import DialogTemplate from "components/DialogTemplate";
import DeleteButton from "components/DeleteButton";

export const AlertDialog = ({
  title,
  content,
  cancelText,
  width,
  showCloseButton = true,
  onClose
}: AlertDialogConfig & DialogProps) =>
  <DialogTemplate
    title={title}
    content={content}
    width={width}
    showCloseButton={showCloseButton}
    cancelText={cancelText || "Ok"}
    cancelButtonColor="primary"
    onClose={onClose}
    showCancelButton={true}
    open={true}
  />;

export const ErrorDialog = ({ title, content, width, onClose, showCancelButton }: ErrorDialogConfig & DialogProps) => {
  const classes = useIconStyles();
  return (
    <DialogTemplate
      title={title}
      content={
        <div className={classes.contentWithIcon}>
          <ErrorIcon className={classes.errorIcon} />
          <Box>
            {content || "Internal server error"}
          </Box>
        </div>
      }
      cancelText="Ok"
      cancelButtonColor="primary"
      width={width}
      showCloseButton={true}
      onClose={onClose}
      showCancelButton={showCancelButton}
      open={true}
    />
  );
};

export const WarningDialog = ({ title, content, width, onClose }: WarningDialogConfig & DialogProps) => {
  const classes = useIconStyles();
  return (
    <DialogTemplate
      title={title}
      content={
        <div className={classes.contentWithIcon}>
          <WarningIcon fontSize="small" className={classes.warningIcon} />
          <Box>
            {content}
          </Box>
        </div>
      }
      cancelText="Ok"
      cancelButtonColor="primary"
      width={width}
      showCloseButton={true}
      onClose={onClose}
      showCancelButton={true}
      open={true}
    />
  );
};

export const SuccessDialog = ({ title, content, width, onClose }: SuccessDialogConfig & DialogProps) => {
  const classes = useIconStyles();
  return (
    <DialogTemplate
      title={title}
      content={
        <div className={classes.contentWithIcon}>
          <SuccessIcon fontSize="small" className={classes.successIcon} />
          <Box>
            {content}
          </Box>
        </div>
      }
      cancelText="Ok"
      cancelButtonColor="primary"
      width={width}
      showCloseButton={true}
      onClose={onClose}
      showCancelButton={true}
      open={true}
    />
  );
};

export const ConfirmDialog = ({
  title,
  content,
  mainActionButton,
  mainActionText,
  width,
  showWarningIcon,
  onClose,
  showCancelButton,
  cancelText
}: ConfirmDialogConfig & DialogProps
) => {
  const classes = useIconStyles();
  const onMainActionCallback = useCallback(() => onClose(true), [onClose]);
  return (
    <DialogTemplate
      title={title}
      content={showWarningIcon
        ? (
          <div className={classes.contentWithIcon}>
            <WarningIcon fontSize="small" className={classes.warningIcon} />
            <Box>
              {content}
            </Box>
          </div>
        )
        : content}
      mainActionButton={
        mainActionButton
          ? mainActionButton
          : (
            <Button
              variant={"contained"}
              onClick={onMainActionCallback}
            >
              {mainActionText ? mainActionText : "Ok"}
            </Button>
          )
      }
      width={width}
      showCloseButton={false}
      onClose={onClose}
      showCancelButton={showCancelButton}
      cancelText={cancelText}
      open={true}
    />
  );
};

export const DeleteDialog = ({ title, content, mainActionText, width, onClose }: DeleteDialogConfig & DialogProps) => {
  const onMainActionCallback = useCallback(() => onClose(true), [onClose]);
  return (
    <ConfirmDialog
      title={title}
      content={content}
      mainActionButton={
        <DeleteButton variant={"contained"}
          color={"primary"}
          onClick={onMainActionCallback}
          startIcon={<DeleteOutlineIcon />}>
          {mainActionText || "Delete"}
        </DeleteButton>
      }
      width={width}
      onClose={onClose}
      showCancelButton={true}
    />
  );
};

export const ReportsDialog = ({
  title,
  content,
  mainActionButton,
  mainActionText,
  width,
  showWarningIcon,
  onClose
}: ConfirmDialogConfig & DialogProps
) => {
  const classes = useIconStyles();
  const onMainActionCallback = useCallback(() => onClose(true), [onClose]);
  return (
    <DialogTemplate
      title={title}
      content={showWarningIcon
        ? (
          <div className={classes.contentWithIcon}>
            <WarningIcon fontSize="small" className={classes.warningIcon} />
            <Box>
              {content}
            </Box>
          </div>
        )
        : content}
      mainActionButton={
        mainActionButton
          ? mainActionButton
          : (
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={onMainActionCallback}
            >
              {mainActionText ? mainActionText : "Ok"}
            </Button>
          )
      }
      width={width}
      showCloseButton={true}
      onClose={onClose}
      showCancelButton={false}
      open={true}
    />
  );
};

const useIconStyles = makeStyles((theme: Theme) => ({
  contentWithIcon: {
    display: "flex",
    alignItems: "start",
    marginTop: theme.spacing(2),
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight
  },
  errorIcon: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(3.5)
  },
  warningIcon: {
    color: theme.palette.warning.main,
    marginRight: theme.spacing(3.5)
  },
  successIcon: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(3.5)
  }
}));
