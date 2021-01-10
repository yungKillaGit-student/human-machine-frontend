import React, { useCallback, useEffect, useState } from "react";
import DialogTemplate from "components/DialogTemplate";
import { useFormFields } from "hooks/useFormFields";
import { ElementType } from "types/common";
import { useRequiredFieldsValidation } from "hooks/useRequiredFieldsValidation";
import ProfileInfoEditContent from "./ProfileInfoEditContent";

const TEXT_FIELDS_KEYS = ["firstName", "lastName", "country"] as const;

export type ProfileInfoTextField = ElementType<typeof TEXT_FIELDS_KEYS>

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => () => void;
  setValue: (name: string, value: any) => void;
  imageUrl?: string;
  onChangeImage?: (event: React.ChangeEvent) => void;
  onDeleteImage?: () => void;
  formFieldsInitialState: Record<ProfileInfoTextField, string>;
  about: string;
  onChangeAbout: (newAbout: string) => void;
}

const ProfileInfoEdit = ({
  isOpen,
  setOpen,
  setValue,
  imageUrl,
  onDeleteImage,
  onChangeImage,
  formFieldsInitialState,
  about,
  onChangeAbout
}: Props) => {
  const [newAbout, setNewAbout] = useState("");
  const onChangeNewAbout = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAbout(event.target.value);
  }, []);

  useEffect(() => {
    setNewAbout(about);
  }, [about]);

  const {
    formFields,
    onChange,
    onChangeValidation,
    validation,
    resetState
  } = useFormFields(formFieldsInitialState);

  const getValidationResult = useRequiredFieldsValidation();

  const validateInputs = useCallback(() => {
    const validation = getValidationResult(formFields, ["about"]);

    if (Object.keys(validation).length > 0) {
      onChangeValidation(validation);
      return false;
    }

    return true;
  }, [formFields, getValidationResult, onChangeValidation]);

  const mainAction = useCallback(async () => {
    if (!validateInputs) {
      return;
    }

    const { firstName, lastName, country } = formFields;

    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("country", country);
    onChangeAbout(newAbout);
    setOpen(false)();
    resetState();
  }, [formFields, newAbout, onChangeAbout, resetState, setOpen, setValue, validateInputs]);

  const onClose = useCallback(() => {
    setOpen(false)();
    setNewAbout(about);
    resetState();
  }, [about, resetState, setOpen]);

  return (
    <DialogTemplate
      open={isOpen}
      content={
        <ProfileInfoEditContent
          formFields={formFields}
          onChange={onChange}
          validation={validation}
          mainAction={mainAction}
          cancelAction={onClose}
          imageUrl={imageUrl}
          onDeleteImage={onDeleteImage}
          onChangeImage={onChangeImage}
          about={newAbout}
          onChangeAbout={onChangeNewAbout}
        />
      }
      onClose={onClose}
      title="Profile information"
      height={600}
    />
  );
};

export default ProfileInfoEdit;
