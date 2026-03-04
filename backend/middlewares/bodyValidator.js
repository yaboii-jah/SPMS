import { errorResponse } from "../utils/responseFormat.js";

export function bodyValidator (req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).send(new errorResponse(false, 'Request body is empty', 'NO_DATA_INPUT'));
  }

  next();
}