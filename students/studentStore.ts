import Student from "../models/student";

class StudentStore {
  /**
   * function for getting all students
   * Returns all students
   */
  async findStudents() {
    return await Student.find({});
  }
  /**
   * function for getting student by id
   * Returns student detail
   */
  async findStudentById(id: string) {
    return await Student.findById(id);
  }
  /**
   * function for getting student by email
   * Returns student detail
   */
  async findStudentByEmail(email: string) {
    return await Student.findOne({ email });
  }
  /**
   * function for creating a student
   * Returns created student
   */
  async createStudent(studentData: any) {
    const newStudent = new Student(studentData);
    await newStudent.save();
    return newStudent;
  }
  /**
   * function for updating a student
   * Returns updated student
   */
  async updateStudent(id: string, updateData: any) {
    return await Student.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    }).lean();
  }
  /**
   * function for deleting a student
   * Returns deleted student
   */
  async deleteStudent(id: string) {
    return await Student.deleteOne({ _id: id });
  }
}

export default new StudentStore();
