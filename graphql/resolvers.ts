import studentService from "../students/studentService";
import { ErrorMessageEnum, STATUS_CODES } from "../utils/enums/studentEnum";
import { ApolloError } from "apollo-server-express";

const resolvers = {
  /**
   * query for getting all users and a single user
   */
  Query: {
    students: async () => {
      const result = await studentService.getAllStudents();
      if (result instanceof Array) {
        return {
          status: result.status,
          message: result.message,
          student: result.students,
        };
      } else {
        return {
          student: "Zero Record Found",
          status: result.status,
          message: result.message,
        };
      }
    },
    student: async (parent: any, args: { _id: string }) => {
      const student = await studentService.getStudentById(args._id);
      return {
        student: student.student,
        status: student.status,
        message: student.message,
      };
    },
  },
  /**
   * mutation for creating, updating, deleting a user
   */
  Mutation: {
    /**
     * function for creating a new student
     */
    create: async (parent: any, args: { body: any }) => {
      const createStudent = await studentService.createStudent(args.body);
      if (
        createStudent.status === STATUS_CODES.BAD_REQUEST &&
        createStudent.error?.message === ErrorMessageEnum.EMAIL_ALREADY_EXIST
      ) {
        throw new ApolloError(ErrorMessageEnum.EMAIL_ALREADY_EXIST);
      }
      if (createStudent.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        throw new ApolloError(ErrorMessageEnum.INTERNAL_SERVER_ERROR);
      }
      if (
        createStudent.status === STATUS_CODES.BAD_REQUEST &&
        createStudent.error?.message == ErrorMessageEnum.VALIDATION_ERROR
      ) {
        throw new ApolloError(ErrorMessageEnum.VALIDATION_ERROR);
      }
      if (createStudent.status === STATUS_CODES.SUCCESS) {
        return {
          student: createStudent.student,
          status: createStudent.status,
          message: createStudent.message,
        };
      }
    },
    /**
     * function for updating a student by id
     */
    update: async (parent: any, args: { _id: string; body: any }) => {
      const updateStudent = await studentService.updateStudent(args);
      if (
        updateStudent.status == STATUS_CODES.BAD_REQUEST &&
        updateStudent.error?.message === ErrorMessageEnum.INVALID_USER_ID
      ) {
        throw new ApolloError(ErrorMessageEnum.INVALID_USER_ID);
      }
      if (updateStudent.status == STATUS_CODES.INTERNAL_SERVER_ERROR) {
        throw new ApolloError(ErrorMessageEnum.INTERNAL_SERVER_ERROR);
      }
      if (updateStudent.status == STATUS_CODES.SUCCESS) {
        return {
          student: updateStudent.student,
          status: updateStudent.status,
          message: updateStudent.message,
        };
      }
    },
    /**
     * function for deleting a student by id
     */
    delete: async (parent: any, args: { _id: string }) => {
      const deleteStudent = await studentService.deleteStudent(args._id);
      if (
        deleteStudent.status == STATUS_CODES.BAD_REQUEST &&
        ErrorMessageEnum.RECORD_NOT_FOUND
      ) {
        throw new ApolloError(ErrorMessageEnum.RECORD_NOT_FOUND);
      }
      if (deleteStudent.status == STATUS_CODES.INTERNAL_SERVER_ERROR) {
        throw new ApolloError(ErrorMessageEnum.INTERNAL_SERVER_ERROR);
      }
      if (deleteStudent.status == STATUS_CODES.SUCCESS) {
        return {
          student: deleteStudent.student,
          status: deleteStudent.status,
          message: deleteStudent.message,
        };
      }
    },
  },
};

export { resolvers };
