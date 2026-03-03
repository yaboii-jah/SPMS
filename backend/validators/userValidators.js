import { body } from "express-validator";
import { errorResponse } from "../utils/responseFormat.js";

export const userValidator = {
  fname : 
    body ('fname')
      .exists().withMessage('Fistname do not exist')
      .trim()
      .notEmpty().withMessage('No Value Provided on Firstname')
      .isString().withMessage('Firstname must be a string')
      .isAlpha('en-US', { ignore : ['-', "'"]} )
    ,

  lname : 
    body ('lname')
      .exists().withMessage('Lastname do not exist')
      .trim()
      .notEmpty().withMessage('No Value Provided on Lastname')
      .isString().withMessage('Lastname must be a string')
      .isAlpha('en-US', { ignore : ['-', "'"]} )
    ,

  mname : 
    body ('mname')
      .optional()
      .trim()
      .notEmpty().withMessage('No Value Provided on Middlename')
      .isString().withMessage('Middlename must be a string')
      .isAlpha('en-US', { ignore : ['-', "'"]} )
    ,

  department : 
    body ('department')
      .exists().withMessage('Department do not exist')
      .trim()
      .notEmpty().withMessage('Invalid Value on Department')
      .isString().withMessage('Department must be a string')
    ,

  supervisor : 
    body ('supervisor')
      .exists().withMessage('Supervisor do not exist')
      .trim()
      .notEmpty().withMessage('Invalid Value on Supervisor')
      .isString().withMessage('Supervisor must be a string')
    ,

  office_head : 
    body ('office_head')
      .exists().withMessage('Office Head do not exist')
      .trim()
      .notEmpty().withMessage('Invalid Value on Office Head')
      .isString().withMessage('Office Head must be a string')
    ,

  email : 
    body ('email')
      .exists().withMessage('Email do not exist')
      .trim()
      .notEmpty().withMessage('Invalid Value on Email')
      .isEmail().withMessage('must be a valid Email')
      .normalizeEmail()
    ,

  password : 
    body ('password')
      .exists().withMessage('Password do not exist')
      .trim()
      .notEmpty().withMessage('Invalid Value on Password')
      .isString().withMessage('Password must be a string')
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