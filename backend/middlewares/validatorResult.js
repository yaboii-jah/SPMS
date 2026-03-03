import { errorResponse } from "../utils/responseFormat.js";

export function validationResultChecker(req, res, next) {
  const error = validationResult(req)
 
  if (error.isEmpty()) {
    return next();
  }
  
   const formattedErrors = error.array().reduce((acc, currentError) => {
    if (!acc[currentError.path]) {
      acc[currentError.path] = [];
    }

    acc[currentError.path].push(currentError.msg);
    return acc;
  }, {}); 

  return res.status(400).send(new errorResponse(false, formattedErrors, 'Bad Request'))
