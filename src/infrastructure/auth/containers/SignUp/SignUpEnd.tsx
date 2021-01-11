import React, { useCallback, useMemo, useState } from "react";
import startCase from "lodash/startCase";
import { SignUpTextField } from "../../../routing/AuthRouting";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import LoginInfoEdit from "./LoginInfoEdit";
import EditIcon from "@material-ui/icons/Edit";
import { UseFormFieldsState } from "../../../../hooks/useFormFields";
import Layout from "../../../../components/Layout";
import ProfileInfoEdit from "./ProfileInfoEdit/ProfileInfoEdit";
import PinCodeEdit from "./PinCodeEdit/PinCodeEdit";
import { UserCreateDto } from "../../../../services/users/models";
import dialogs from "../../../dialogs/dialogs";
import { AuthPages } from "../../constants";
import { useHistory } from "react-router-dom";
import OkCancelButtons from "../../../../components/OkCancelButtons";
import { signUp } from "../../authService";
import { handleError, uploadFile } from "../../../apiService";
import { useDispatch } from "react-redux";
import { appActions } from "../../../../state/appState";
import { updateUser } from "../../../../services/users/api";
import { ComboboxOption } from "../../../../components/VirtualAutoComplete";

interface Props {
  useFormFieldsState: UseFormFieldsState<Record<SignUpTextField, string>>;
  imageFile: File | null;
  imageUrl?: string;
  onChangeImage?: (event: React.ChangeEvent) => void;
  onDeleteImage?: () => void;
  selectedCountry: ComboboxOption | null;
  onChangeCountry: (event: any, value: ComboboxOption | null) => void;
  selectedRegion: ComboboxOption | null;
  onChangeRegion: (event: any, value: ComboboxOption | null) => void;
}

const SignUpEnd = ({
  useFormFieldsState,
  imageFile,
  imageUrl,
  onChangeImage,
  onDeleteImage,
  selectedCountry,
  onChangeCountry,
  selectedRegion,
  onChangeRegion
}: Props) => {
  const {
    formFieldsData,
    setValue,
    resetState
  } = useFormFieldsState;

  const renderInfoLabels = useCallback((textFields: string[]) => {
    return textFields.map(textFieldName => {
      let labelText = `${startCase(textFieldName)}:`;
      if (formFieldsData[textFieldName as SignUpTextField] && textFieldName !== "password") {
        labelText = `${labelText} ${formFieldsData[textFieldName as SignUpTextField]}`;
      }
      if (textFieldName === "password") {
        labelText = `${labelText} ${"*".repeat(formFieldsData.password.length)}`;
      }
      return (
        <Grid item xs={12} key={textFieldName}>
          <Typography>
            { labelText }
          </Typography>
        </Grid>
      );
    });
  }, [formFieldsData]);

  const [showLoginInfoEdit, setShowLoginInfoEdit] = useState(false);
  const onChangeShowLoginInfoEdit = useCallback((isOpen: boolean) => {
    return () => setShowLoginInfoEdit(isOpen);
  }, []);

  const [showProfileInfoEdit, setShowProfileInfoEdit] = useState(false);
  const onChangeShowProfileInfoEdit = useCallback((isOpen) => {
    return () => setShowProfileInfoEdit(isOpen);
  }, []);

  const profileInfoFormFieldsInitial = useMemo(() => {
    const {
      firstName,
      lastName
    } = formFieldsData;

    return {
      firstName: firstName,
      lastName: lastName
    };
  }, [formFieldsData]);

  const [pinCode, setPinCode] = useState("");
  const onChangePinCode = useCallback((newPinCode: string) => {
    setPinCode(newPinCode);
  }, []);

  const [about, setAbout] = useState("");
  const onChangeAbout = useCallback((newAbout: string) => {
    setAbout(newAbout);
  }, []);

  const [showPinCodeEdit, setShowPinCodeEdit] = useState(false);
  const onChangeShowPinCodeEdit = useCallback((isOpen: boolean) => {
    return () => setShowPinCodeEdit(isOpen);
  }, []);

  const history = useHistory();

  const resetFormState = useCallback(() => {
    resetState();
    setAbout("");
    setPinCode("");
  }, [resetState]);

  const mainAction = useCallback(async () => {
    const {
      email,
      password,
      repeatPassword,
      firstName,
      lastName
    } = formFieldsData;

    if (!selectedCountry) {
      dialogs.alert({
        title: "Alert!",
        content: "Please, select country"
      });
      return;
    }
    else if (selectedCountry.value === "RU" && !selectedRegion) {
      dialogs.alert({
        title: "Alert!",
        content: "Please, select region"
      });
      return;
    }

    if (!pinCode) {
      dialogs.alert({
        title: "Alert!",
        content: "Please, set PIN"
      });
      return;
    }

    const createDto: UserCreateDto = {
      about: about,
      country: selectedCountry.name,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      pinCode: pinCode,
      repeatedPassword: repeatPassword
    };

    try {
      const user = await signUp(createDto);

      if (imageFile) {
        const { name: uploadedFileName } = await uploadFile(imageFile);
        await updateUser({ imageName: uploadedFileName }, user.id);
      }

      history.push(AuthPages.SignIn);
      resetFormState();
    }
    catch (error) {
      handleError(error);
    }
  }, [about, formFieldsData, history, imageFile, pinCode, resetFormState, selectedCountry, selectedRegion]);

  const cancelAction = useCallback(() => {
    history.push(AuthPages.SignIn);
    resetFormState();
  }, [history, resetFormState]);

  return (
    <Layout
      withImageUploader={true}
      onDeleteImage={onDeleteImage}
      onChangeImage={onChangeImage}
      imageUrl={imageUrl}
    >
      <LoginInfoEdit
        isOpen={showLoginInfoEdit}
        setOpen={onChangeShowLoginInfoEdit}
        email={formFieldsData.email}
        setValue={setValue}
        oldPassword={formFieldsData.password}
      />
      <ProfileInfoEdit
        isOpen={showProfileInfoEdit}
        setOpen={onChangeShowProfileInfoEdit}
        setValue={setValue}
        imageUrl={imageUrl}
        onDeleteImage={onDeleteImage}
        onChangeImage={onChangeImage}
        formFieldsInitialState={profileInfoFormFieldsInitial}
        about={about}
        onChangeAbout={onChangeAbout}
        selectedCountry={selectedCountry}
        onChangeCountry={onChangeCountry}
        selectedRegion={selectedRegion}
        onChangeRegion={onChangeRegion}
      />
      <PinCodeEdit
        isOpen={showPinCodeEdit}
        setOpen={onChangeShowPinCodeEdit}
        pinCode={pinCode}
        onChangePinCode={onChangePinCode}
      />
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Login information"
            action={
              <IconButton onClick={onChangeShowLoginInfoEdit(true)}>
                <EditIcon/>
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              { renderInfoLabels(["email", "password"]) }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Profile information"
            action={
              <IconButton onClick={onChangeShowProfileInfoEdit(true)}>
                <EditIcon/>
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              { renderInfoLabels(["firstName", "lastName", "country"]) }
              <Grid item xs={12}>
                <Typography>
                  { `About: ${about}` }
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Personal Identification Number"
            action={
              <IconButton onClick={onChangeShowPinCodeEdit(true)}>
                <EditIcon/>
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex">
                  <Box>
                    <Typography>{ `PIN: ${pinCode}` }</Typography>
                  </Box>
                  <Box ml="auto">
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={onChangeShowPinCodeEdit(true)}
                    >
                      Set PIN
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <OkCancelButtons
        mainAction={mainAction}
        cancelAction={cancelAction}
      />
    </Layout>
  );
};

export default SignUpEnd;
