import React, { ReactElement, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { UseFormFieldsState } from "../../../../hooks/useFormFields";
import GridRow from "../../../../components/GridRow";
import startCase from "lodash/startCase";
import { Box, TextField } from "@material-ui/core";
import { useRequiredFieldsValidation } from "../../../../hooks/useRequiredFieldsValidation";
import Layout from "../../../../components/Layout";
import OkCancelButtons from "../../../../components/OkCancelButtons";
import { AuthPages } from "../../constants";
import { SignUpTextField, TEXT_FIELDS_KEYS } from "../../../routing/AuthRouting";
import { ComboboxOption } from "../../../../components/VirtualAutoComplete";
import SelectCountry from "../../../../components/SelectCountry";
import SelectRussianRegion from "../../../../components/SelectRussianRegion";
import dialogs from "../../../dialogs/dialogs";

interface Props {
  useFormFieldsState: UseFormFieldsState<Record<SignUpTextField, string>>;
  imageUrl?: string;
  onChangeImage?: (event: React.ChangeEvent) => void;
  onDeleteImage?: () => void;
  selectedCountry: ComboboxOption | null;
  onChangeCountry: (event: any, value: ComboboxOption | null) => void;
  selectedRegion: ComboboxOption | null;
  onChangeRegion: (event: any, value: ComboboxOption | null) => void;
}

const SignUpStart = ({
  useFormFieldsState,
  imageUrl,
  onDeleteImage,
  onChangeImage,
  selectedCountry,
  onChangeCountry,
  selectedRegion,
  onChangeRegion
}: Props) => {
  const history = useHistory();

  const {
    formFieldsData,
    validation,
    onChange,
    onChangeValidation
  } = useFormFieldsState;

  const formFields = useMemo(() => {
    return Object.keys(formFieldsData).reduce((o, textboxName) => {
      return {
        ...o,
        [textboxName]: (
          <GridRow label={startCase(textboxName)} key={textboxName}>
            <Box width="100%" ml="auto">
              <TextField
                type={textboxName === "password" || textboxName === "repeatPassword" ? "password" : "text"}
                variant="outlined"
                error={!!validation[textboxName]}
                value={formFieldsData[textboxName as SignUpTextField]}
                onChange={onChange}
                name={textboxName}
                fullWidth={true}
                helperText={validation[textboxName]}
              />
            </Box>
          </GridRow>
        )
      };
    }, {}) as Record<SignUpTextField, ReactElement>;
  }, [formFieldsData, validation, onChange]);

  const getValidationResult = useRequiredFieldsValidation();

  const validateInputs = useCallback(() => {
    const validation = getValidationResult(formFieldsData);

    if (!selectedCountry) {
      dialogs.alert({
        title: "Alert!",
        content: "Please, select country"
      });
      return false;
    }
    else if (selectedCountry.value === "RU" && !selectedRegion) {
      dialogs.alert({
        title: "Alert!",
        content: "Please, select region"
      });
      return false;
    }

    if (Object.keys(validation).length > 0) {
      onChangeValidation(validation);
      return false;
    }

    if (formFieldsData.password !== formFieldsData.repeatPassword) {
      onChangeValidation({
        password: "Passwords must be the same",
        repeatPassword: "Passwords must be the same"
      });
      return false;
    }

    return true;
  }, [formFieldsData, getValidationResult, onChangeValidation, selectedCountry, selectedRegion]);

  const onOk = useCallback(async () => {
    if (!validateInputs()) {
      return;
    }
    history.push(AuthPages.SignUpEnd);
  }, [history, validateInputs]);

  const onCancel = useCallback(() => {
    history.push(AuthPages.SignIn);
  }, [history]);

  const isRussiaSelected = useMemo(() => {
    if (selectedCountry) {
      return selectedCountry.value === "RU";
    }
    return false;
  }, [selectedCountry]);

  return (
    <Layout
      withImageUploader={true}
      onDeleteImage={onDeleteImage}
      onChangeImage={onChangeImage}
      imageUrl={imageUrl}
    >
      { formFields.firstName }
      { formFields.lastName }
      <GridRow label="Country">
        <SelectCountry
          selectedOption={selectedCountry}
          onChange={onChangeCountry}
        />
      </GridRow>
      <GridRow label={isRussiaSelected ? "Region" : ""}>
        <Box
          visibility={isRussiaSelected ? "visible" : undefined}
          display={isRussiaSelected ? undefined : "none"}
          width="100%"
        >
          <SelectRussianRegion
            selectedOption={selectedRegion}
            onChange={onChangeRegion}
          />
        </Box>
      </GridRow>
      { formFields.email }
      { formFields.password }
      { formFields.repeatPassword }
      <OkCancelButtons
        mainAction={onOk}
        cancelAction={onCancel}
      />
    </Layout>
  );
};

export default SignUpStart;
