import { body, param } from "express-validator";
import { errorResponse } from "../utils/responseFormat.js";

export const userValidator = {
  first_name : 
    body ('first_name')
      .exists().withMessage('Fistname do not exist')
      .trim()
      .notEmpty().withMessage('No Value Provided on Firstname')
      .isString().withMessage('Firstname must be a string')
      .isAlpha('en-US', { ignore : ['-', "'"]} )
    ,

  last_name : 
    body ('last_name')
      .exists().withMessage('Lastname do not exist')
      .trim()
      .notEmpty().withMessage('No Value Provided on Lastname')
      .isString().withMessage('Lastname must be a string')
      .isAlpha('en-US', { ignore : ['-', "'"]} )
    ,

  middle_name : 
    body ('middle_name')
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

  username : 
    body ('username')
      .exists().withMessage('Username do not exist')
      .trim()
      .notEmpty().withMessage('Invalid Value on Username')
      .isString().withMessage('Username must be a string')
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
    if (field === 'username' || field === 'password') {
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

export async function updateValidator (req, res, next) {
  const fields = Object.keys(req.body);
  const required = Object.keys(userValidator)
  
  const validators = []

  if (!fields.every(req => required.includes(req))) {
    return res.status(422).send(new errorResponse(false, 'Invalid fields to Check', 'NO_VALID_FIELDS'))
  }

  for (const field of fields) {
    validators.push(userValidator[field])
  }
  
  for (const validator of validators) {
    await validator.run(req)
  }

  next()
}

export const routeParamsValidator = [
  param('id')
    .exists().withMessage('Please provide id')
    .trim()
    .isInt().withMessage('User ID must be integer')
    .toInt().withMessage('Invalid value for User ID')
]



