import { getDialogManager } from "./components/DialogManager";
import {
  DialogProps, ShowOptions, AlertDialogConfig, ErrorDialogConfig, WarningDialogConfig, SuccessDialogConfig,
  ConfirmDialogConfig, DeleteDialogConfig
} from "./types";
import {
  ConfirmDialog, DeleteDialog, AlertDialog, SuccessDialog, WarningDialog, ErrorDialog
} from "./components/StandardDialogs";

async function showDialog<C>(dialog: React.ComponentType<C & DialogProps>, config?: C, options?: ShowOptions): Promise<any> {
  return getDialogManager().show(dialog, config, options);
}

export default {
  async alert(config: AlertDialogConfig): Promise<void> {
    await showDialog(AlertDialog, config);
  },

  async error(config: ErrorDialogConfig): Promise<void> {
    await showDialog(ErrorDialog, config);
  },

  async warning(config: WarningDialogConfig): Promise<void> {
    await showDialog(WarningDialog, config);
  },

  async success(config: SuccessDialogConfig): Promise<void> {
    await showDialog(SuccessDialog, config);
  },

  async confirm(config: ConfirmDialogConfig): Promise<boolean> {
    const result = await showDialog(ConfirmDialog, config);
    return result === true;
  },

  async confirmDelete(config: DeleteDialogConfig): Promise<boolean> {
    const result = await showDialog(DeleteDialog, config);
    return result === true;
  }
};
