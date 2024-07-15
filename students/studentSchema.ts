import Joi from 'joi';
//Joi validation for creating a new student
export const studentCreateSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(20),
    lastName: Joi.string().required().min(2).max(20),
    age: Joi.number().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });

//Joi validation for updating a student
  export  const studentUpdateSchema = Joi.object({
    firstName: Joi.string().optional().min(2).max(20),
    lastName: Joi.string().optional().min(2).max(20),
    age: Joi.number().optional(),
    email: Joi.string().optional().email(),
    password: Joi.string().optional()
  });
  