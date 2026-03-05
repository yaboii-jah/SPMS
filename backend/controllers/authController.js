
import { errorResponse, successResponse } from '../utils/responseFormat.js';
import { createUser, updateUser, findUser, comparePassword } from '../services/authServices.js';
import { generateAccessToken } from '../utils/generateToken.js';

export async function registerUser (req, res) {
  const result = await createUser(req.body)

  if (!result.success) {
    return res.status(500).send(new errorResponse(false, result.message, "INTERNAL_SERVER_ERROR"))
  }

  res.status(201).send(new successResponse(true, result.data, 'User Created Successfully'))
} 

export async function logIn (req, res) {
  const { username, password} = req.body

  const result = await findUser(username)
  
  if (!result.data || !result.success) {
    return res.status(404).send(new errorResponse(false, result.message, "USER_NOT_FOUND"))
  }

  const valid = await comparePassword(password, result.data.password)

  console.log(valid)

  if (!valid.success) {
    return res.status(401).send(new errorResponse(false, result.message, "INVALID_CREDENTIALS"))
  }
 
  const token = generateAccessToken(result.data)

  res.status(200).send(new successResponse(true, token, 'User Successfuly Logged in'))
}

export function logout () {
  
}

export async function update (req, res) {
  console.log(req.user)
  const result = await updateUser(req.params.id, req.body)

  if (!result.success) {
    return res.status(500).send(new errorResponse(false, result.message, "INTERNAL_SERVER_ERROR"))
  } 

  res.status(200).send(new successResponse(true, result.data, 'User Updated Successfully'))
}

