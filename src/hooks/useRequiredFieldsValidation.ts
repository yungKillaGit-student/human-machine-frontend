import { useCallback } from "react";

export const useRequiredFieldsValidation = () => {
  return useCallback((requiredFields: Record<string, any>, exceptions?: string[]): Record<string, string> => {
    return Object.keys(requiredFields).reduce((o, key) => {
      if (requiredFields[key] || (exceptions && exceptions.includes(key))) {
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
