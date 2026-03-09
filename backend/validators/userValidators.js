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

export async function userValidator (req, res, next) {

    if ( req.body.role === 'IPCR') {
      intialValidators['supervisor_division_chief'] = 
        body('supervisor_division_chief')
          .exists().withMessage('supervisor_division_chief do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on supervisor_division_chief')
          .isString().withMessage('supervisor_division_chief must be string')

      intialValidators['office_director'] = 
        body('office_director')
          .exists().withMessage('office_director do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on office_director')
          .isString().withMessage('office_director must be string')
    }

    if (req.body.role === 'DPCR') {
      intialValidators['commissioner'] =
        body('commissioner')
          .exists().withMessage('commissioner do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on commissioner')
          .isString().withMessage('commissioner must be string')

      intialValidators['alloted_budget'] = 
        body('alloted_budget')
          .exists().withMessage('alloted_budget do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on alloted_budget')
          .isString().withMessage('alloted_budget must be string')

      intialValidators['accountable'] = 
        body('accountable')
          .exists().withMessage('accountable do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on accountable')
          .isString().withMessage('accountable must be string')

      intialValidators['office_director'] = 
        body ('office_director')
          .exists().withMessage('office_director do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on office_director')
          .isString().withMessage('office_director must be string')
    }

    if ( req.body.role === 'OPCR') {
      intialValidators['commissioner'] =
        body('commissioner')
          .exists().withMessage('commissioner do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on commissioner')
          .isString().withMessage('commissioner must be string')

      intialValidators['alloted_budget'] = 
        body('alloted_budget')
          .exists().withMessage('alloted_budget do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on alloted_budget')
          .isString().withMessage('alloted_budget must be string')

      intialValidators['accountable'] = 
        body('accountable')
          .exists().withMessage('accountable do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on accountable')
          .isString().withMessage('accountable must be string')

      intialValidators['chairperson'] = 
        body('chairperson')
          .exists().withMessage('chairperson do not exist')
          .trim()
          .notEmpty().withMessage('Invalid Value on chairperson')
          .isString().withMessage('chairperson must be string')
    }

  for ( const validator of Object.values(intialValidators)) {
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
  const fields = Object.keys(req.body);
  const required = Object.keys(intialValidators)
  
  const validators = []

  if (!fields.every(req => required.includes(req))) {
    return res.status(422).send(new errorResponse(false, 'Invalid fields to Check', 'NO_VALID_FIELDS'))
  }

  for (const field of fields) {
    validators.push(intialValidators[field])
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



