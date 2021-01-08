import { ReactNode } from "react";

export interface DialogProps {
  onClose: (dialogResult: any) => void;
}

export interface ShowOptions {
  blockOthers?: boolean;
}

export interface AlertDialogConfig {
  title: string;
  content: string | ReactNode;
  cancelText?: string;
  width?: number;
  showCloseButton?: boolean;
}

export interface ErrorDialogConfig {
  title: string;
  content: string | ReactNode;
  width?: number;
  showCancelButton?: boolean;
}

export interface WarningDialogConfig {
  title: string;
  content: string | ReactNode;
  width?: number;
}

export interface SuccessDialogConfig {
  title: string;
  content: string | ReactNode;
  width?: number;
}

export interface ConfirmDialogConfig {
  title: string;
  content: string | ReactNode;
  mainActionButton?: ReactNode;
  mainActionText?: string;
  showWarningIcon?: boolean;
  width?: number;
  showCancelButton: boolean;
  cancelText?: string;
}

export interface DeleteDialogConfig {
  title: string;
  content: string | ReactNode;
  mainActionText?: string;
  width?: number;
}
