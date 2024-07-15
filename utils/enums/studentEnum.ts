// status codes 
export enum STATUS_CODES {
  UNKNOWN_CODE = 0,
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  GATEWAY_TIMEOUT = 504,
}

// error messages
export enum ErrorMessageEnum {
  INVALID_REQUEST = "Invalid Request Created",
  VALIDATION_ERROR = "Validation Error",
  RECORD_NOT_FOUND = "Record Not Found",
  INVALID_USER_ID = "Invalid User Id",
  INVALID_EMAIL_OR_CODE = "Invalid Email or Code!!",
  SET_YOUR_PASSWORD = "Please set you password first!!",
  INVALID_CREDENTIALS = " Invalid credentials",
  EMAIL_ALREADY_EXIST = "Email Already Exist",
  ID_ALREADY_EXIST = "ID Already Exist",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

// success messages
export const SuccessMessages = {
  LOGIN: 'Login successfully.',

  fetchedAllUser: 'Users fetched successfully.',

  create: (value: string) => {
    return `${value} created successfully.`;
  },
  fetch: (value: string) => {
    return `${value} fetched successfully.`;
  },
  update: (value: string) => {
    return `${value} updated successfully.`;
  },
  delete: (value: string) => {
    return `${value} deleted successfully.`;
  },
};