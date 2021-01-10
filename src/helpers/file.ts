import { v4 as uuid } from "uuid";

export const getFileExtension = (fileName: string) => {
  const extIndex = fileName.lastIndexOf(".");
  return extIndex >= 0
    ? fileName.substring(fileName.lastIndexOf("."))
    : "";
};

export const generateUniqueFileName = (fileName: string) => {
  const fileExt = getFileExtension(fileName);
  return uuid() + fileExt;
};
