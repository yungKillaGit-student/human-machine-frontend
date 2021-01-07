import axios, { Method } from "axios";
import { stringify } from "query-string";

import { API_PATH } from "../constants/api";
import { DataOptions } from "../types/data";

axios.defaults.baseURL = API_PATH;
axios.defaults.paramsSerializer = params => stringify(params);
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  document.body.style.cursor = "progress";
  return config;
});
axios.interceptors.response.use((config) => {
  document.body.style.cursor = "default";
  return config;
});

interface RequestOptions {
  method?: Method;
  data?: any;
  headers?: any;
}

export const executeRequest = async <T>(url: string, options: RequestOptions & DataOptions = {}): Promise<T> => {
  const { data } = await axios.request({ ...{ url }, ...options });
  return data;
};
