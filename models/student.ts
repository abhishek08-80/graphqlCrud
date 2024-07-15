import mongoose from 'mongoose';
import shortid from 'shortid';

const studentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  }
});

const Student = mongoose.model('student', studentSchema);

export default Student;
