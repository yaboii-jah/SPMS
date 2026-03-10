import { body, param } from "express-validator";
import { errorResponse } from "../utils/responseFormat.js";

export const intialValidators = {
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

  department :
    body ('department')
      .exists().withMessage('Department do not exist')
      .trim()
      .notEmpty().withMessage('Invalid Value on Department')
      .isString().withMessage('Department must be string')
  ,

  middle_name : 
    body ('middle_name')
      .optional()
      .trim()
      .notEmpty().withMessage('No Value Provided on Middlename')
      .isString().withMessage('Middlename must be a string')
      .isAlpha('en-US', { ignore : ['-', "'"]} )
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
  ,   
  role : 
    body ('role')
      .exists().withMessage('role do not exist')
      .trim()
      .notEmpty().withMessage('Invalid Value on role')
      .isString().withMessage('role must be a string')
}

function additionalValidator (role) {
  const addedValidators = {}

  if ( role === 'IPCR' || role === 'DPCR') {
    addedValidators['office_director'] = 
      body('office_director')
        .exists().withMessage('office_director do not exist')
        .trim()
        .notEmpty().withMessage('Invalid Value on office_director')
        .isString().withMessage('office_director must be string')
  }

  if ( role === 'IPCR') {
    addedValidators['supervisor_division_chief'] = 
      body('supervisor_division_chief')
        .exists().withMessage('supervisor_division_chief do not exist')
        .trim()
        .notEmpty().withMessage('Invalid Value on supervisor_division_chief')
        .isString().withMessage('supervisor_division_chief must be string')
  }
  
  if ( role === 'DPCR' || role === 'OPCR') {
    addedValidators['commissioner'] =
      body('commissioner')
        .exists().withMessage('commissioner do not exist')
        .trim()
        .notEmpty().withMessage('Invalid Value on commissioner')
        .isString().withMessage('commissioner must be string')
  }

  if ( role === 'OPCR') {
    addedValidators['chairperson'] = 
      body('chairperson')
        .exists().withMessage('chairperson do not exist')
        .trim()
        .notEmpty().withMessage('Invalid Value on chairperson')
        .isString().withMessage('chairperson must be string')
  }

  return addedValidators
}

export async function userValidator (req, res, next) {
  const validatorsCopy = {...intialValidators, ...additionalValidator(req.body.role)} 

  for ( const validator of Object.values(validatorsCopy)) {
    await validator.run(req)
  }
  next()
}

export async function logInValidator (req, res, next) {
  const fields = Object.keys(req.body);
  
  const validators = []

  for (const field of fields) {
    if (field === 'username' || field === 'password') {
      validators.push(intialValidators[field])
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
  const required = {...intialValidators, ...additionalValidator(req.body.role)} 
  const fields = Object.keys(req.body);
  
  const validators = []

  if (!fields.every(req => required.includes(req))) {
    return res.status(422).send(new errorResponse(false, 'Invalid fields to Check', 'NO_VALID_FIELDS'))
  }

  for (const field of fields) {
    validators.push(required[field])
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




