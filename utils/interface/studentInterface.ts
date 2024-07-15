import { ErrorMessageEnum, STATUS_CODES } from "../enums/studentEnum";

export interface createStudent {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  status: string;
}
export interface updateStudentRequest {
  body: {
    name: string;
    age: number;
    email: string;
    password: string;
    status: string;
  };
  _id: string;
}
export interface IStudent {
  email?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  status?: string;
  _id?: string;
}

export interface IResponse {
  status: STATUS_CODES;
  error?: IError;
}
export interface IError {
  message?: string;
  status?: ErrorMessageEnum;
}

export interface ICreateStudentResponse extends IResponse {
  student?: IStudent;
  status: STATUS_CODES;
}

export interface IUpdateStudentResponse extends IResponse {
  student?: IStudent;
  status: STATUS_CODES;
}

export interface IdeleteUserResponse extends IResponse {
  student?: any;
  status: STATUS_CODES;
}
