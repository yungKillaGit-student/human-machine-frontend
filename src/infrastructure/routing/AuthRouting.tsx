import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthPages } from "../auth/constants";
import SignIn from "../auth/containers/SignIn";
import { ElementType } from "../../types/common";
import SignUpStart from "../auth/containers/SignUp";
import SignUpEnd from "../auth/containers/SignUp/SignUpEnd";
import { useFormFields } from "../../hooks/useFormFields";
import { ComboboxOption } from "../../components/VirtualAutoComplete";
import store from "helpers/store";

export const TEXT_FIELDS_KEYS = ["firstName", "lastName", "email", "password", "repeatPassword"] as const;

export type SignUpTextField = ElementType<typeof TEXT_FIELDS_KEYS>;

const signUpFormFieldsData = store.get("signUpFormFields");
const selectedCountryFromStore = store.get("selectedCountry");
const selectedRegionFromStore = store.get("selectedRegion");

const TEXT_FIELDS_INITIAL_STATE = TEXT_FIELDS_KEYS.reduce((o, key) => ({
  ...o, [key]: ""
}), {}) as Record<SignUpTextField, string>;

const AuthRouting = () => {
  const [authInitial, setAuthInitial] = useState(signUpFormFieldsData ?? TEXT_FIELDS_INITIAL_STATE);
  const useFormFieldsState = useFormFields(authInitial);

  useEffect(() => {
    if (useFormFieldsState.formFieldsData) {
      store.set("signUpFormFields", useFormFieldsState.formFieldsData);
    }
  }, [useFormFieldsState.formFieldsData, useFormFieldsState.formFieldsData.email]);

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

  const [selectedCountry, setSelectedCountry] = useState<ComboboxOption | null>(null);
  const onChangeCountry = useCallback((event: any, option: ComboboxOption | null) => {
    setSelectedCountry(option);
    store.set("selectedCountry", option);
  }, []);

  const [selectedRegion, setSelectedRegion] = useState<ComboboxOption | null>(null);
  const onChangeRegion = useCallback((event: any, option: ComboboxOption | null) => {
    setSelectedRegion(option);
    store.set("selectedRegion", option);
  }, []);

  useEffect(() => {
    store.observe("signUpFormFields", (value: any, oldValue: any) => {
      if (!value) {
        setAuthInitial(TEXT_FIELDS_INITIAL_STATE);
      }
    });
    store.observe("selectedCountry", (value: any, oldValue: any) => {
      if (!value) {
        setSelectedCountry(null);
      }
    });
    store.observe("selectedRegion", (value: any, oldValue: any) => {
      if (!value) {
        setSelectedRegion(null);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCountryFromStore) {
      setSelectedCountry(selectedCountryFromStore);
    }

    if (selectedRegionFromStore) {
      setSelectedRegion(selectedRegionFromStore);
    }
  }, []);

  const resetLocalStorage = useCallback(() => {
    store.set("signUpFormFields", null);
    store.set("selectedCountry", null);
    store.set("selectedRegion", null);
  }, []);

  const isRussiaSelected = useMemo(() => {
    if (selectedCountry) {
      return selectedCountry.value === "RU";
    }
    return false;
  }, [selectedCountry]);

  return (
    <Switch>
      <Route exact path={AuthPages.SignIn} component={SignIn}/>
      <Route exact path={AuthPages.SignUpStart}>
        <SignUpStart
          useFormFieldsState={useFormFieldsState}
          imageUrl={imageUrl}
          onChangeImage={onChangeImage}
          onDeleteImage={onDeleteImage}
          selectedCountry={selectedCountry}
          onChangeCountry={onChangeCountry}
          selectedRegion={selectedRegion}
          onChangeRegion={onChangeRegion}
          resetLocalStorage={resetLocalStorage}
          isRussiaSelected={isRussiaSelected}
        />
      </Route>
      <Route exact path={AuthPages.SignUpEnd}>
        <SignUpEnd
          useFormFieldsState={useFormFieldsState}
          imageUrl={imageUrl}
          onChangeImage={onChangeImage}
          onDeleteImage={onDeleteImage}
          imageFile={imageFile}
          selectedCountry={selectedCountry}
          onChangeCountry={onChangeCountry}
          selectedRegion={selectedRegion}
          onChangeRegion={onChangeRegion}
          resetLocalStorage={resetLocalStorage}
          isRussiaSelected={isRussiaSelected}
        />
      </Route>
    </Switch>
  );
};

export default AuthRouting;
