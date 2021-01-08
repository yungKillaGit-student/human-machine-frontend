import { ErrorInfo } from "./types";
import i18n from "./i18n";
import dialogs from "../dialogs/dialogs";

export const getUserFriendlyMessage = (error: ErrorInfo): string => {
  if (error.message === "ERROR_BAD_REQUEST_FILE_LARGE_SIZE") {
    if (error.parameters && error.parameters.maxSize) {
      error.parameters.maxSize = error.parameters.maxSize / 1024 / 1024;
    }
  }
  const defaultMessage = i18n.t("errors.ERROR_DEFAULT", error.parameters) || "Unable to connect to the Server.";
  return i18n.t(
    `errors.${error.message}`,
    {
      ...error.parameters,
      defaultValue: defaultMessage
    }
  );
};

export const showError = (error: ErrorInfo) => {
  const message = getUserFriendlyMessage(error);
  const title = error.message === "ERROR_SERVER_UNAVAILABLE" ? "Service Unavailable" : "Error";
  dialogs.error({ title, content: message });
};
