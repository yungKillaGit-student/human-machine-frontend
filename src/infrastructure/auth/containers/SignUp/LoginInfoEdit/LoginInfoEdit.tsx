import React, { useCallback, useState } from "react";
import DialogTemplate from "components/DialogTemplate";
import LoginInfoEditContent from "./LoginInfoEditContent";
import { useFormFields } from "hooks/useFormFields";
import { ElementType } from "types/common";
import { useRequiredFieldsValidation } from "hooks/useRequiredFieldsValidation";

const TEXT_FIELDS_KEYS = ["currentPassword", "newPassword", "repeatPassword"] as const;

export type LoginInfoTextField = ElementType<typeof TEXT_FIELDS_KEYS>

const TEXT_FIELDS_INITIAL_STATE = TEXT_FIELDS_KEYS.reduce((o, key) => ({
  ...o, [key]: ""
}), {}) as Record<LoginInfoTextField, string>;

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => () => void;
  email: string;
  setValue: (name: string, value: any) => void;
  oldPassword: string;
}

const LoginInfoEdit = ({
  isOpen,
  setOpen,
  email,
  setValue,
  oldPassword
}: Props) => {
  const {
    formFields,
    onChange,
    onChangeValidation,
    validation,
    resetState
  } = useFormFields(TEXT_FIELDS_INITIAL_STATE);

  const getValidationResult = useRequiredFieldsValidation();

  const validateInputs = useCallback(() => {
    const validation = getValidationResult(formFields);

    if (Object.keys(validation).length > 0) {
      onChangeValidation(validation);
      return false;
    }

    if (oldPassword !== formFields.currentPassword) {
      validation.currentPassword = "This password is not equal to current password";
    }

    if (formFields.newPassword !== formFields.repeatPassword) {
      validation.password = "Passwords must be the same";
      validation.repeatPassword = "Passwords must be the same";
    }

    if (Object.keys(validation).length > 0) {
      onChangeValidation(validation);
      return false;
    }

    return true;
  }, [formFields, getValidationResult, oldPassword, onChangeValidation]);

  const mainAction = useCallback(async () => {
    if (!validateInputs) {
      return;
    }

    const { newPassword, repeatPassword } = formFields;

    setValue("password", newPassword);
    setValue("repeatedPassword", repeatPassword);
    setOpen(false)();
    resetState();
  }, [formFields, resetState, setOpen, setValue, validateInputs]);

  const onClose = useCallback(() => {
    setOpen(false)();
    resetState();
  }, [resetState, setOpen]);

  return (
    <DialogTemplate
      open={isOpen}
      content={
        <LoginInfoEditContent
          email={email}
          formFields={formFields}
          validation={validation}
          onChange={onChange}
          mainAction={mainAction}
          cancelAction={onClose}
        />
      }
      onClose={onClose}
      title="Login information"
    />
  );
};

export default LoginInfoEdit;
