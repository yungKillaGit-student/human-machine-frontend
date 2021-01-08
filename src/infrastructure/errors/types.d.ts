export interface ErrorInfo {
  message: string | any;
  parameters?: { [key: string]: any };
}

export class ApiError extends Error {
  info: ErrorInfo;
  status: number;

  constructor(message: string, info: ErrorInfo, status: number) {
    super(message);
    this.info = info;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ApiError.name;
    this.status = status;
  }
}
