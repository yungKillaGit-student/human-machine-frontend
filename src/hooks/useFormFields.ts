import { useCallback, useEffect, useState } from "react";

export interface UseFormFieldsState<T> {
  formFields: T;
  validation: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: (name: string, value: any) => void;
  resetState: () => void;
  onChangeValidation: (newValidation: Record<string, string>) => void;
}

export const useFormFields = <T>(initialValues: T): UseFormFieldsState<T> => {
  const [formFields, setFormFields] = useState<T>({ ...initialValues });
  const [validation, setValidation] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = Object.keys(initialValues).reduce((o, key) => ({
      ...o, [key]: ""
    }), {});
    setValidation(validation);
  }, [initialValues]);

  useEffect(() => {
    setFormFields(initialValues);
  }, [initialValues]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValidation = { ...validation };
    updatedValidation[e.target.name] = "";
    setValidation(updatedValidation);
    setFormFields((prev: T) => ({ ...prev, [e.target.name]: e.target.value }));
  }, [validation]);

  const setValue = useCallback((name: string, value: any) => {
    setFormFields((prev: T) => ({ ...prev, [name]: value }));
  }, []);

  const resetState = useCallback(() => {
    setFormFields(initialValues);
  }, [initialValues]);

  const onChangeValidation = useCallback((newValidation: Record<string, string>) => {
    setValidation(newValidation);
  }, []);

  return {
    formFields,
    onChange,
    setValue,
    resetState,
    onChangeValidation,
    validation
  };
};
