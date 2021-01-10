import React, { useCallback, useEffect, useState } from "react";
import DialogTemplate from "../../../../../components/DialogTemplate";
import LoginInfoEditContent from "../LoginInfoEdit/LoginInfoEditContent";
import PinCodeEditContent from "./PinCodeEditContent";

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => () => void;
  pinCode: string;
  onChangePinCode: (newPinCode: string) => void;
}

const PinCodeEdit = ({
  isOpen,
  setOpen,
  pinCode,
  onChangePinCode
}: Props) => {
  const [error, setError] = useState("");

  const [newPinCode, setNewPinCode] = useState("");
  const onChangeNewPinCode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPinCode(event.target.value);
  }, []);

  useEffect(() => {
    setNewPinCode(pinCode);
  }, [pinCode]);

  const onClose = useCallback(() => {
    setOpen(false)();
    setNewPinCode(pinCode);
  }, [pinCode, setOpen]);

  const mainAction = useCallback(() => {
    if (!newPinCode) {
      setError("Please, fill required field");
    }
    else {
      onChangePinCode(newPinCode);
      onClose();
    }
  }, [newPinCode, onChangePinCode, onClose]);

  return (
    <DialogTemplate
      open={isOpen}
      content={
        <PinCodeEditContent
          pinCode={newPinCode}
          onChangePinCode={onChangeNewPinCode}
          mainAction={mainAction}
          cancelAction={onClose}
          error={error}
        />
      }
      onClose={onClose}
      title="Login information"
    />
  );
};

export default PinCodeEdit;
