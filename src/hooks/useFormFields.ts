import { useCallback, useEffect, useState } from "react";

export const useFormFields = <T>(initialValues: T) => {
  const [formFields, setFormFields] = useState<T>(initialValues);

  useEffect(() => {
    setFormFields(initialValues);
  }, [initialValues]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields((prev: T) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const setValue = useCallback((name: keyof T, value: any) => {
    setFormFields((prev: T) => ({ ...prev, [name]: value }));
  }, []);

  const resetState = useCallback(() => {
    setFormFields(initialValues);
  }, [initialValues]);

  return {
    formFields,
    onChange,
    setValue,
    resetState
  };
};
