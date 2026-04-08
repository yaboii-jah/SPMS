
import { errorResponse, successResponse } from '../utils/responseFormat.js';
import { createUser, updateUser, findUser, comparePassword, fetchUserDetails } from '../services/authServices.js';
import { generateAccessToken } from '../utils/generateToken.js';
import { errorHandler } from '../utils/asyncErrorHandler.js';
import jwt from 'jsonwebtoken'
import 'dotenv/config';

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

  if (!result.success) {
    return res.status(result.error).send(new errorResponse(false, result.message, result.error))
  }

  const valid = await comparePassword(password, result.data.password)

  if (!valid.success) {
    return res.status(valid.error).send(new errorResponse(false, valid.message, valid.error))
  }
 
  const token = generateAccessToken(result.data)  

  res.cookie("refreshToken", token.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });

  res.status(200).send(new successResponse(true, token.accessToken, 'User Successfully Logged in'))
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

export async function fetchUser (req, res) {
  const result = await fetchUserDetails(req.user.user_id)

  if (!result.success) {
    return res.status(result.error).send(new errorResponse(false, result.message, result.error))
  } 

  res.status(200).send(new successResponse(true, result.data, 'User Successfully Retrieved'))
}

export async function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).send(new errorResponse(false, 'User is Unauthorized', 401))
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { user_id: decoded.user_id, role: decoded.role},
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.send(new successResponse(true, newAccessToken, "Refresh token successfully refreshed"));
  } catch(error) {
    console.error(error)
    res.status(500).send(new errorResponse(false, "Internal server error", 500))
  }
}
