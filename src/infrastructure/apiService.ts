import axios, { Method } from "axios";
import { stringify } from "query-string";

import { API_PATH } from "../constants/api";
import { DataOptions } from "../types/data";
import { getUserFriendlyMessage, showError } from "./errors";
import { ApiError, ErrorInfo } from "./errors/types.d";
import { generateUniqueFileName } from "../helpers/file";
import { FileUploadResponseDto } from "../types/files";

axios.defaults.baseURL = API_PATH;
axios.defaults.paramsSerializer = params => stringify(params);
axios.defaults.withCredentials = true;

interface RequestOptions {
  method?: Method;
  data?: any;
  headers?: any;
  withCredentials?: boolean;
  hideErrorDialog?: boolean;
}

export const readErrorInfo = async (response: any): Promise<ErrorInfo> => {
  let error;
  const { code } = response;
  try {
    error = { ...response };
    error.parameters = { ...error.parameters, ...{ status: code } };
  }
  catch (ex) {
    if (code >= 500 && code <= 599) {
      error = "ERROR_SERVER_UNAVAILABLE";
    }
    else {
      error = "ERROR_UNEXPECTED";
    }
  }

  return error.message ? error : { message: error, parameters: { status: code } };
};

export const handleError = async (response: any, hideErrorDialog?: boolean): Promise<ApiError> => {
  const errorInfo = await readErrorInfo(response);

  if (!hideErrorDialog) {
    showError(errorInfo);
  }

  return new ApiError(getUserFriendlyMessage(errorInfo), errorInfo, response.code);
};

export const executeRequest = async <T>(url: string, options: RequestOptions & DataOptions = { withCredentials: true }): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios.request({ ...{ url }, ...options })
      .then(response => resolve(response.data))
      .catch(err => reject(handleError(err.response.data, options.hideErrorDialog)));
  });
};

export const createFileFormData = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", generateUniqueFileName(file.name));

  return formData;
};

export const uploadFile = async (file: File): Promise<FileUploadResponseDto> => {
  return new Promise((resolve, reject) => {
    const fileFormData = createFileFormData(file);
    axios.request({
      url: "/files/upload",
      method: "POST",
      data: fileFormData
    })
      .then(response => resolve(response.data))
      .catch(response => reject(handleError(response)));
  });
};
