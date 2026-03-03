import { body } from "express-validator";
import { errorResponse } from "../utils/responseFormat.js";

export const userValidator = {
  fname : 
    body ('fname')
      .trim()
      .notEmpty().withMessage('Invalid Value on Firstname')
      .isString().withMessage('Firstname must be a string')
    ,

    lname : 
    body ('lname')
      .trim()
      .notEmpty().withMessage('Invalid Value on Lastname')
      .isString().withMessage('Lastname must be a string')
    ,

    department : 
    body ('department')
      .trim()
      .notEmpty().withMessage('Invalid Value on Department')
      .isString().withMessage('Department must be a string')
    ,

    supervisor : 
    body ('supervisor')
      .trim()
      .notEmpty().withMessage('Invalid Value on Supervisor')
      .isString().withMessage('Supervisor must be a string')
    ,

    office_head : 
    body ('office_head')
      .trim()
      .notEmpty().withMessage('Invalid Value on Office Head')
      .isString().withMessage('Office Head must be a string')
    ,

    email : 
    body ('email')
      .trim()
      .notEmpty().withMessage('Invalid Value on Email')
      .isEmail().withMessage('must be a valid Email')
      .normalizeEmail()
}  

export async function logInValidator (req, res, next) {
  const fields = Object.keys(req.body);
  
  const validators = []

  for (const field of fields) {
    if (field === 'email' || field === 'password') {
      validators.push(userValidator[field])
    }
  }

  if (validators.length === 0) { 
    return res.status(422).send(new errorResponse(false, 'Invalid fields to Check', 'NO_VALID_FIELDS'))
  }
  
  for (const validator of validators) {
    await validator.run(req)
  }

  next()
}