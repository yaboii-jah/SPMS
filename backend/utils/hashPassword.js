import { errorHandler } from "../utils/asyncErrorHandler.js";
import bcrypt from "bcrypt"

export async function hashPassword (req, res, next) {
  const { data } = await errorHandler(() => bcrypt.hash( req.body.password, 10))
  req.body.password = data
  next()
}