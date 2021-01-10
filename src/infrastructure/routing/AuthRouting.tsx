import React, { useCallback, useMemo, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthPages } from "../auth/constants";
import SignIn from "../auth/containers/SignIn";
import { ElementType } from "../../types/common";
import SignUpStart from "../auth/containers/SignUp";
import SignUpEnd from "../auth/containers/SignUp/SignUpEnd";
import { useFormFields } from "../../hooks/useFormFields";

const TEXT_FIELDS_KEYS = ["firstName", "lastName", "country", "email", "password", "repeatPassword"] as const;

export type SignUpTextField = ElementType<typeof TEXT_FIELDS_KEYS>;

const TEXT_FIELDS_INITIAL_STATE = TEXT_FIELDS_KEYS.reduce((o, key) => ({
  ...o, [key]: ""
}), {}) as Record<SignUpTextField, string>;

const AuthRouting = () => {
  const useFormFieldsState = useFormFields(TEXT_FIELDS_INITIAL_STATE);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const imageUrl = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
  }, [imageFile]);

  const onChangeImage = useCallback((event) => {
    if (event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  }, []);

  const onDeleteImage = useCallback(() => {
    setImageFile(null);
  }, []);

  return (
    <Switch>
      <Route exact path={AuthPages.SignIn} component={SignIn}/>
      <Route exact path={AuthPages.SignUpStart}>
        <SignUpStart
          useFormFieldsState={useFormFieldsState}
          imageUrl={imageUrl}
          onChangeImage={onChangeImage}
          onDeleteImage={onDeleteImage}
        />
      </Route>
      <Route exact path={AuthPages.SignUpEnd}>
        <SignUpEnd
          useFormFieldsState={useFormFieldsState}
          imageUrl={imageUrl}
          onChangeImage={onChangeImage}
          onDeleteImage={onDeleteImage}
          imageFile={imageFile}
        />
      </Route>
    </Switch>
  );
};

export default AuthRouting;
