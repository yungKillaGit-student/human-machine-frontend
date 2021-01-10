import React, { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { UseFormFieldsState } from "../../../../hooks/useFormFields";
import GridRow from "../../../../components/GridRow";
import startCase from "lodash/startCase";
import { Box, Button, TextField } from "@material-ui/core";
import { useRequiredFieldsValidation } from "../../../../hooks/useRequiredFieldsValidation";
import Layout from "../../../../components/Layout";
import OkCancelButtons from "../../../../components/OkCancelButtons";
import { AuthPages } from "../../constants";
import { SignUpTextField } from "../../../routing/AuthRouting";

interface Props {
  useFormFieldsState: UseFormFieldsState<Record<SignUpTextField, string>>;
  imageUrl?: string;
  onChangeImage?: (event: React.ChangeEvent) => void;
  onDeleteImage?: () => void;
}

const SignUpStart = ({
  useFormFieldsState,
  imageUrl,
  onDeleteImage,
  onChangeImage
}: Props) => {
  const history = useHistory();

  const {
    formFields,
    validation,
    onChange,
    onChangeValidation
  } = useFormFieldsState;

  const textBoxes = useMemo(() => {
    return Object.keys(formFields).map(textboxName => {
      return (
        <GridRow label={startCase(textboxName)} key={textboxName}>
          <Box width="100%" ml="auto">
            <TextField
              type={textboxName === "password" || textboxName === "repeatPassword" ? "password" : "text"}
              variant="outlined"
              error={!!validation[textboxName]}
              value={formFields[textboxName as SignUpTextField]}
              onChange={onChange}
              name={textboxName}
              fullWidth={true}
              helperText={validation[textboxName]}
            />
          </Box>
        </GridRow>
      );
    });
  }, [onChange, formFields, validation]);

  const getValidationResult = useRequiredFieldsValidation();

  const validateInputs = useCallback(() => {
    const validation = getValidationResult(formFields);

    if (Object.keys(validation).length > 0) {
      onChangeValidation(validation);
      return false;
    }

    if (formFields.password !== formFields.repeatPassword) {
      onChangeValidation({
        password: "Passwords must be the same",
        repeatPassword: "Passwords must be the same"
      });
      return false;
    }

    return true;
  }, [formFields, getValidationResult, onChangeValidation]);

  const onOk = useCallback(async () => {
    if (!validateInputs()) {
      return;
    }
    history.push(AuthPages.SignUpEnd);
  }, [history, validateInputs]);

  const onCancel = useCallback(() => {
    history.push(AuthPages.SignIn);
  }, [history]);

  return (
    <Layout
      withImageUploader={true}
      onDeleteImage={onDeleteImage}
      onChangeImage={onChangeImage}
      imageUrl={imageUrl}
    >
      { textBoxes }
      <OkCancelButtons
        mainAction={onOk}
        cancelAction={onCancel}
      />
    </Layout>
  );
};

export default SignUpStart;
