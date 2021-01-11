import { useCallback, useEffect, useState } from "react";

export interface UseFormFieldsState<T> {
  formFieldsData: T;
  validation: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: (name: string, value: any) => void;
  resetState: () => void;
  onChangeValidation: (newValidation: Record<string, string>) => void;
}

export const useFormFields = <T>(initialValues: T): UseFormFieldsState<T> => {
  const [formFieldsData, setFormFieldsData] = useState<T>({ ...initialValues });
  const [validation, setValidation] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = Object.keys(initialValues).reduce((o, key) => ({
      ...o, [key]: ""
    }), {});
    setValidation(validation);
  }, [initialValues]);

  useEffect(() => {
    setFormFieldsData(initialValues);
  }, [initialValues]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValidation = { ...validation };
    updatedValidation[e.target.name] = "";
    setValidation(updatedValidation);
    setFormFieldsData((prev: T) => ({ ...prev, [e.target.name]: e.target.value }));
  }, [validation]);

  const setValue = useCallback((name: string, value: any) => {
    setFormFieldsData((prev: T) => ({ ...prev, [name]: value }));
  }, []);

  const resetState = useCallback(() => {
    setFormFieldsData(initialValues);
  }, [initialValues]);

  const onChangeValidation = useCallback((newValidation: Record<string, string>) => {
    setValidation(newValidation);
  }, []);

  return {
    formFieldsData,
    onChange,
    setValue,
    resetState,
    onChangeValidation,
    validation
  };
};
