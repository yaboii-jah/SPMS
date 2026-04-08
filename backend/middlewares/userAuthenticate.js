import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { errorResponse } from '../utils/responseFormat.js';

export async function verifyToken (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(new errorResponse(false, 'Unauthorized user', 401))
  }

  const token = authHeader.split(" ")[1]
 
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET
    )
    
    req.user = decoded

    next()

  } catch (error) {
    console.error("Error verifying token", error)
    res.status(403).json(new errorResponse(false, 'Provided token is invalid', 403))

  }
}