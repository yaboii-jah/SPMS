
import { errorResponse, successResponse } from '../utils/responseFormat.js';
import { createUser, updateUser } from '../services/authServices.js';

export async function registerUser (req, res) {
  const result = await createUser(req.body)

  if (!result.success) {
    return res.status(500).send(new errorResponse(false, result.message, "INTERNAL_SERVER_ERROR"))
  }

  res.status(201).send(new successResponse(true, result.data, 'User Created Successfully'))
} 

export function logIn () {

}

export function logout () {

}

export async function update (req, res) {
  const result = await updateUser(req.params.id, req.body)

  if (!result.success) {
    return res.status(500).send(new errorResponse(false, result.message, "INTERNAL_SERVER_ERROR"))
  } 

  res.status(200).send(new successResponse(true, result.data, 'User Updated Successfully'))
}

