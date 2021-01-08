import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import startCase from "lodash/startCase";

import GridRow from "components/GridRow";
import { ElementType } from "types/common";
import { useFormFields } from "hooks/useFormFields";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { UserCreateDto } from "dataAccess/criteria";
import { signUp } from "../../authService";
import { useRequiredFieldsValidation } from "hooks/useRequiredFieldsValidation";
import ImageUploader from "../../../../components/ImageUploader";
import OkCancelButtons from "../../../../components/OkCancelButtons";
import ProfileInformation from "./ProfileInformation/ProfileInformation";

const TEXT_FIELDS_KEYS = ["firstName", "lastName", "country", "email", "password", "repeatPassword"] as const;

export type TextFieldName = ElementType<typeof TEXT_FIELDS_KEYS>

const TEXT_FIELDS_INITIAL_STATE = TEXT_FIELDS_KEYS.reduce((o, key) => ({
  ...o, [key]: ""
}), {}) as Record<TextFieldName, string>;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  formFields: {
    width: 900
  }
}));

const SignUp = () => {
  const classes = useStyles();

  const history = useHistory();

  const {
    formFields,
    onChange
  } = useFormFields(TEXT_FIELDS_INITIAL_STATE);

  const [validation, setValidation] = useState<Record<string, string>>({ ...TEXT_FIELDS_INITIAL_STATE });

  const extendedOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValidation = { ...validation };
    updatedValidation[e.target.name] = "";
    setValidation(updatedValidation);
    onChange(e);
  }, [onChange, validation]);

  const textBoxes = useMemo(() => {
    return Object.keys(formFields).map(textboxName => {
      return (
        <GridRow label={startCase(textboxName)} key={textboxName}>
          <Box width="100%" ml="auto">
            <TextField
              type={textboxName === "password" || textboxName === "repeatPassword" ? "password" : "text"}
              variant="outlined"
              error={!!validation[textboxName]}
              value={formFields[textboxName as TextFieldName]}
              onChange={extendedOnChange}
              name={textboxName}
              fullWidth={true}
              helperText={validation[textboxName]}
            />
          </Box>
        </GridRow>
      );
    });
  }, [extendedOnChange, formFields, validation]);

  const getValidationResult = useRequiredFieldsValidation();

  const validateInputs = useCallback(() => {
    const validation = getValidationResult(formFields);

    if (Object.keys(validation).length > 0) {
      setValidation(validation);
      return false;
    }

    if (formFields.password !== formFields.repeatPassword) {
      setValidation({
        password: "Passwords must be the same",
        repeatPassword: "Passwords must be the same"
      });
      return false;
    }

    return true;
  }, [formFields, getValidationResult]);

  const [showProfileInformation, setShowProfileInformation] = useState(false);

  const onOk = useCallback(async () => {
    if (!validateInputs()) {
      return;
    }

    setShowProfileInformation(true);
    /*const {
      country,
      email,
      firstName,
      lastName,
      password,
      repeatPassword
    } = formFields;
    const createDto: UserCreateDto = {
      country: country,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      repeatedPassword: repeatPassword
    };
    try {
      await signUp(createDto);
      history.push("/");
    }
    catch (err) {
      console.log(err);
    }*/
  }, [validateInputs]);

  const onCancel = useCallback(() => {
    history.push("/");
  }, [history]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const imageUrl = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
  }, [imageFile]);

  const onChangeImage = useCallback((event) => {
    setImageFile(event.target.files[0]);
  }, []);

  const onDeleteImage = useCallback(() => {
    setImageFile(null);
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.formFields}>
        <Grid container spacing={5}>
          <Grid container item xs={4}>
            <ImageUploader
              imageUrl={imageUrl}
              onChangeImage={onChangeImage}
              onDeleteImage={onDeleteImage}
            />
          </Grid>
          <Grid container item xs={8} spacing={2}>
            { showProfileInformation ? <ProfileInformation formFields={formFields}/> : textBoxes }
            <OkCancelButtons
              mainAction={onOk}
              cancelAction={onCancel}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
