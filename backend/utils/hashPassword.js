import { errorHandler } from "../utils/asyncErrorHandler.js";
import bcrypt from "bcrypt"

export async function hashPassword (req, res, next) {
  if (req.body.password) {
    const { data } = await errorHandler(() => bcrypt.hash( req.body.password, 10))
    console.log(data)
    req.body.password = data
  }

  next()
}