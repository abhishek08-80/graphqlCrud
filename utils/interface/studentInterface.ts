import { ErrorMessageEnum, STATUS_CODES } from "../enums/studentEnum";
import {SuccessMessages} from '../enums/studentEnum'
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
  message?: string;
}
export interface IError {
  message?: string;
  status?: ErrorMessageEnum;
}

export interface ICreateStudentResponse extends IResponse {
  student?: IStudent;
}

export interface IUpdateStudentResponse extends IResponse {
  student?: IStudent;
}

export interface IDeleteStudentResponse extends IResponse {
  student?: any;
}
export interface IGetAllStudentResponse extends IResponse {
  students?: any;
}