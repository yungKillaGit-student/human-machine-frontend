import React, { useCallback, useEffect, useState } from "react";
import DialogTemplate from "../../../../../components/DialogTemplate";
import PinCodeEditContent from "./PinCodeEditContent";
import { PIN_CODE_REGEX } from "../../../../../constants/regex";

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
    if (pinCode) {
      setNewPinCode("");
    }
  }, [pinCode]);

  const onClose = useCallback(() => {
    setOpen(false)();
    setNewPinCode(pinCode);
    setError("");
  }, [pinCode, setOpen]);

  const mainAction = useCallback(() => {
    if (!newPinCode) {
      setError("Please, fill required field");
    }
    else if (PIN_CODE_REGEX.test(newPinCode)) {
      onChangePinCode(newPinCode);
      onClose();
    }
    else {
      setError("Please, enter valid PIN (4 digits)");
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
