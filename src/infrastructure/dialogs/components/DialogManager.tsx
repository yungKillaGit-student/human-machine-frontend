import React, { ReactNode } from "react";
import { DialogProps, ShowOptions } from "../types";

interface DialogManager {
  show<P>(dialog: React.ComponentType<P & DialogProps>, props?: P, options?: ShowOptions): Promise<any>;
}

let instance: DialogManager | null = null;
export function getDialogManager(): DialogManager {
  if (!instance)
    throw new Error("Dialog Manager is not initialized");

  return instance;
}

interface Props {
  children: any;
}

interface State {
  isOpen: boolean;
  dialog?: React.ComponentType<Record<string, any> & DialogProps> | null;
  dialogProps?: Record<string, any>;
  showOptions: ShowOptions;
  resolve?: ((dialogResult: any) => void) | null;
}

export default class DialogManagerImpl extends React.Component<Props, State> implements DialogManager {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      showOptions: {}
    };

    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    instance = this;
  }

  componentWillUnmount() {
    instance = null;
  }

  render(): ReactNode {
    const { children } = this.props;
    const { isOpen, dialog, dialogProps } = this.state;
    const Dialog = dialog;

    return (
      <>
        {children}
        {isOpen && Dialog && <Dialog {...dialogProps} onClose={this.onClose} />}
      </>
    );
  }

  onClose(dialogResult: any) {
    const { resolve } = this.state;
    this.setState(
      { isOpen: false, dialog: null, dialogProps: {}, showOptions: {}, resolve: null },
      () => {
        resolve && resolve(dialogResult);
      });
  }

  public show<P>(dialog: React.ComponentType<P & DialogProps>, props?: P, options: ShowOptions = {}): Promise<any> {
    const { blockOthers = false } = this.state.showOptions;

    return new Promise(resolve => {
      if (blockOthers) {
        resolve(null);
        return;
      }

      this.setState({
        isOpen: true,
        dialog: dialog as React.ComponentType<Record<string, any> & DialogProps>,
        dialogProps: props || {},
        showOptions: options,
        resolve
      });
    });
  }
}