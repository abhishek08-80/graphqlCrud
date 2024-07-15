import { ValidationError } from "apollo-server";
import StudentStore from "./studentStore";
import { studentCreateSchema, studentUpdateSchema } from "./studentSchema";
import { ErrorMessages } from "../utils/messages/studentResponse";
import { ErrorMessageEnum, STATUS_CODES } from "../utils/enums/studentEnum";
import { toError } from "../utils/common/common";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
import {
  ICreateStudentResponse,
  IStudent,
  IUpdateStudentResponse,
  IdeleteUserResponse,
  createStudent,
  updateStudentRequest,
} from "../utils/interface/studentInterface";
import logger from "../utils/logger/logger";

class StudentService {
  /**
   * Service function for getting all students
   * Returns array of students
   */
  async getAllStudents() {
    const response = {
      status: STATUS_CODES.UNKNOWN_CODE,
    };
    try {
      const response = {
        status: STATUS_CODES.SUCCESS,
        data: await StudentStore.findStudents(),
      };
      return response;
    } catch (e: any) {
      response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      return response;
    }
  }
  /**
   * Service function for getting a student by id
   * Returns details of student
   */
  async getStudentById(id: string) {
    const response: ICreateStudentResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
    };
    try {
      const student = await StudentStore.findStudentById(id);
      if (!student) {
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(ErrorMessageEnum.INVALID_USER_ID);
        return response;
      }
      return student;
    } catch (e: any) {
      (response.status = STATUS_CODES.INTERNAL_SERVER_ERROR),
        (response.error = toError(e.message));
      return response;
    }
  }
  /**
   * Service function for creating a new student
   * Returns student
   */
  async createStudent(
    studentData: createStudent
  ): Promise<ICreateStudentResponse> {
    const response: ICreateStudentResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
    };

    try {
      // Joi validation
      const { error } = studentCreateSchema.validate(studentData);
      if (error) {
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(ErrorMessageEnum.VALIDATION_ERROR);
        return response;
      }
      const existingStudent = await StudentStore.findStudentByEmail(
        studentData.email
      );
      if (existingStudent) {
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(ErrorMessageEnum.EMAIL_ALREADY_EXIST);
        return response;
      }
      const hashPassword = await bcrypt.hash(studentData.password, 10);

      studentData.password = hashPassword;
      const saveUser = await StudentStore.createStudent(studentData);

      response.status = STATUS_CODES.SUCCESS;
      response.student = saveUser;
      return response;
    } catch (e: any) {
      logger.error(
        ErrorMessages.errorLog('createStudent', e)
      );
      (response.status = STATUS_CODES.INTERNAL_SERVER_ERROR),
        (response.error = toError(e.message));
      return response;
    }
  }
  /**
   * Service function for updating student by Id
   * Returns updated student
   */
  async updateStudent(
    request: updateStudentRequest
  ): Promise<IUpdateStudentResponse> {
    const response: IUpdateStudentResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
    };
    const { _id, body } = request;
    try {
      // Joi validation
      const { error } = studentUpdateSchema.validate(body);
      if (error) {
        throw new ValidationError(ErrorMessages.validationError);
      }
      if (body.password) {
        const hashPassword = await bcrypt.hash(body.password, 10);
        body.password = hashPassword;
      }
      const existingStudent = await StudentStore.updateStudent(_id, body);
      if (!existingStudent) {
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(ErrorMessageEnum.INVALID_USER_ID);
        return response;
      }
      response.status = STATUS_CODES.SUCCESS;
      response.student = existingStudent;
      return response;
    } catch (e: any) {
      (response.status = STATUS_CODES.INTERNAL_SERVER_ERROR),
        (response.error = toError(e.message));
      return response;
    }
  }
  /**
   * Service function for deleting student
   * Returns deleted student
   */
  async deleteStudent(id: string): Promise<IdeleteUserResponse> {
    const response: IdeleteUserResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
    };
    try {
      const findStudent = await StudentStore.findStudentById(id);
      if (!findStudent) {
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(ErrorMessageEnum.RECORD_NOT_FOUND);
        return response;
      }
      await StudentStore.deleteStudent(id);
      response.status = STATUS_CODES.SUCCESS;
      response.student = findStudent;
      return response;
    } catch (e: any) {
      (response.status = STATUS_CODES.INTERNAL_SERVER_ERROR),
        (response.error = toError(e.message));
      return response;
    }
  }
}

export default new StudentService();
