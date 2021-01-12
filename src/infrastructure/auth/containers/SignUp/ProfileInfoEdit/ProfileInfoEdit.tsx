import React, { useCallback, useEffect, useState } from "react";
import DialogTemplate from "components/DialogTemplate";
import { useFormFields } from "hooks/useFormFields";
import { ElementType } from "types/common";
import { useRequiredFieldsValidation } from "hooks/useRequiredFieldsValidation";
import ProfileInfoEditContent from "./ProfileInfoEditContent";
import { ComboboxOption } from "../../../../../components/VirtualAutoComplete";
import dialogs from "../../../../dialogs/dialogs";

const TEXT_FIELDS_KEYS = ["firstName", "lastName"] as const;

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
  selectedCountry: ComboboxOption | null;
  onChangeCountry: (event: any, value: ComboboxOption | null) => void;
  selectedRegion: ComboboxOption | null;
  onChangeRegion: (event: any, value: ComboboxOption | null) => void;
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
  onChangeAbout,
  selectedCountry,
  onChangeCountry,
  selectedRegion,
  onChangeRegion
}: Props) => {
  const [newAbout, setNewAbout] = useState("");
  const onChangeNewAbout = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAbout(event.target.value);
  }, []);

  const [newSelectedCountry, setNewSelectedCountry] = useState<ComboboxOption | null>(null);
  const onChangeNewSelectedCountry = useCallback((event: any, option: ComboboxOption | null) => {
    setNewSelectedCountry(option);
  }, []);

  const [newSelectedRegion, setNewSelectedRegion] = useState<ComboboxOption | null>(null);
  const onChangeNewSelectedRegion = useCallback((event: any, option: ComboboxOption | null) => {
    setNewSelectedRegion(option);
  }, []);

  useEffect(() => {
    setNewAbout(about);
    setNewSelectedCountry(selectedCountry);
    setNewSelectedRegion(selectedRegion);
  }, [about, selectedCountry, selectedRegion]);

  const {
    formFieldsData,
    onChange,
    onChangeValidation,
    validation,
    resetState
  } = useFormFields(formFieldsInitialState);

  const getValidationResult = useRequiredFieldsValidation();

  const validateInputs = useCallback(() => {
    const validation = getValidationResult(formFieldsData, ["about"]);

    if (Object.keys(validation).length > 0) {
      onChangeValidation(validation);
      return false;
    }

    if (!newSelectedCountry) {
      dialogs.alert({
        title: "Alert!",
        content: "Please, select country"
      });
      return false;
    }
    else if (newSelectedCountry.value === "RU" && !newSelectedRegion) {
      dialogs.alert({
        title: "Alert!",
        content: "Please, select region"
      });
      return false;
    }

    return true;
  }, [formFieldsData, getValidationResult, newSelectedCountry, newSelectedRegion, onChangeValidation]);

  const mainAction = useCallback(async () => {
    if (!validateInputs()) {
      return;
    }

    const { firstName, lastName } = formFieldsData;

    setValue("firstName", firstName);
    setValue("lastName", lastName);
    onChangeAbout(newAbout);
    onChangeCountry(null, newSelectedCountry);
    onChangeRegion(null, newSelectedRegion);
    setOpen(false)();
    resetState();
  }, [formFieldsData, newAbout, newSelectedCountry, newSelectedRegion, onChangeAbout, onChangeCountry, onChangeRegion, resetState, setOpen, setValue, validateInputs]);

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
          formFields={formFieldsData}
          onChange={onChange}
          validation={validation}
          mainAction={mainAction}
          cancelAction={onClose}
          imageUrl={imageUrl}
          onDeleteImage={onDeleteImage}
          onChangeImage={onChangeImage}
          about={newAbout}
          onChangeAbout={onChangeNewAbout}
          selectedCountry={newSelectedCountry}
          onChangeCountry={onChangeNewSelectedCountry}
          selectedRegion={newSelectedRegion}
          onChangeRegion={onChangeNewSelectedRegion}
        />
      }
      onClose={onClose}
      title="Profile information"
      height={600}
    />
  );
};

export default ProfileInfoEdit;
