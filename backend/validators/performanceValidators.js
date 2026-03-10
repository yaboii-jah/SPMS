import { body, param } from "express-validator";
import { errorResponse } from "../utils/responseFormat.js";

export const intialValidators = {
    key_perf : 
        body ('key_perf')
            .exists().withMessage('Key Performance do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on Key Performance')
            .isString().withMessage('Key Performance must be a string')
    , 

    sucess_indic: 
        body ('sucess_indic')
            .exists().withMessage('Success Indicator do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on Success Indicator')
            .isString().withMessage('Success Indicator must be a string')
    ,
    
    actual_accomp :
        body ('actual_accomp')
            .exists().withMessage('actual_accomp do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on actual_accomp')
            .isString().withMessage('actual_accomp must be a string')
    ,

    quality : 
        body ('quality')
            .exists().withMessage('quality do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on quality')
            .isString().withMessage('quality must be a string')
    ,
    
    efficiency : 
        body ('efficiency')
            .exists().withMessage('efficiency do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on efficiency')
            .isString().withMessage('efficiency must be a string')
    ,

    timeliness : 
        body ('timeliness')
            .exists().withMessage('timeliness do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on timeliness')
            .isString().withMessage('timeliness must be a string')
    ,

    remarks : 
        body ('remarks')
            .isString().withMessage('remarks must be a string')
    ,

    category :
        body ('category')
            .exists().withMessage('category do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on category')
            .isString().withMessage('category must be a string')
    ,

    training_developmental_intervention : 
        body ('training_developmental_intervention')
            .isString().withMessage('training_developmental_intervention must be a string')
    ,

    user_id : 
        body ('user_id')
            .exists().withMessage('user_id do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on user_id')
            .isInt().withMessage('user_id must be a Int')
    ,
}

function additionalValidator (role) {
  const addedValidators = {}

  if (role === 'DPCR' || role === 'OPCR') {
    addedValidators['alloted_budget'] = 
        body ('alloted_budget')
            .exists().withMessage('Alloted Number do not exist')
            .notEmpty().withMessage('No Value Provided on Alloted Number')
            .isInt().withMessage('Alloted Number must be a Number')

    addedValidators['division_individuals_accountable'] =
        body ('division_individuals_accountable')
            .exists().withMessage('division_individuals_accountable do not exist')
            .trim()
            .notEmpty().withMessage('No Value Provided on division_individuals_accountable')
            .isString().withMessage('division_individuals_accountable must be a string')
  }

  return addedValidators
}


export async function performanceValidator (req, res, next) {
  const validatorsCopy = {...intialValidators, ...additionalValidator(req.user.role)}

  for ( const validator of Object.values(validatorsCopy)) {
    await validator.run(req)
  }
  next()
}

export async function updateValidator (req, res, next) {
  const fields = Object.keys(req.body);
  const required = {...intialValidators, ...additionalValidator(req.user.role)}
  
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




