import { useCallback } from "react";

export const useRequiredFieldsValidation = () => {
  return useCallback((requiredFields: Record<string, any>) => {
    return Object.keys(requiredFields).reduce((o, key) => {
      if (requiredFields[key]) {
        return o;
      }
      else {
        return {
          ...o, [key]: "Please, fill required field"
        };
      }
    }, {});
  }, []);
};
