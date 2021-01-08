/* eslint-disable quote-props */

export default {
  // _API ERRORS_
  // 400 BAD REQUEST
  "ERROR_BAD_REQUEST": "{{entity}} is incorrect",
  "ERROR_BAD_REQUEST_FILE_LARGE_NAME": "File name is too long",
  "ERROR_BAD_REQUEST_FILE_LARGE_RESOLUTION": "The file resolution exceeds the allowed limit of {{maxResolution}} megapixels and cannot be saved",
  "ERROR_BAD_REQUEST_FILE_LARGE_SIZE": "Maximum file size exceeded. The file cannot be larger than {{maxSize}} MB.",
  "ERROR_BAD_REQUEST_FILE_WRONG_DATA": "File could not be uploaded, because {{message}}",
  // 401 UNAUTHORIZED
  "ERROR_USER_UNAUTHORIZED": "You are not authorized",
  // 403 FORBIDDEN
  "FORBIDDEN_DATA": "You do not have permission to execute this operation",
  "FORBIDDEN_ACTION": "You do not have permission to execute this operation",
  // 404 NOT FOUND
  "ERROR_OBJECT_NOT_FOUND": "The {{entity}} is not found",
  // 406 NOT ACCEPTED
  "NOT_ACCEPTABLE": "Sorry, something went wrong",
  // 409 CONFLICT
  "ERROR_CONFLICT_OBJECT_ALREADY_EXISTS": "{{entity}} already exists",
  // 500 INTERNAL SERVER ERROR
  "INTERNAL_SERVER_ERROR": "Internal Server Error",
  "ERROR_FILE_COULD_NOT_BE_UPLOADED": "Something went wrong, please try another file",

  // _CLIENT ERRORS_
  "ERROR_DEFAULT": "Sorry, something went wrong ({{status}})",
  "ERROR_SERVER_UNAVAILABLE": "The server is unavailable. Please try again later.",
  "ERROR_UNEXPECTED": "Sorry, an unexpected error occurred"
};
