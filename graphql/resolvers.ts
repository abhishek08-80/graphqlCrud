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
        return result;
      } else {
        return {
          student: "Zero Record Found",
          status: result.status,
        };
      }
    },
    student: async (parent: any, args: { _id: string }) => {
      const student = await studentService.getStudentById(args._id);
    },
  },
  /**
   * mutation for creating, updating, deleting a single user
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
        ErrorMessageEnum.INVALID_USER_ID
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
        };
      }
    },
  },
};

export { resolvers };
