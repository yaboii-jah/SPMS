import { successResponse, errorResponse } from "../utils/responseFormat"

export async function refresh (setAccessToken) {
  try {
    const result = await fetch('http://localhost:3005/auth/api/refresh', {
      method : 'POST',
      headers : {
        "Content-Type" : 'application/json'
      },
      credentials : "include"
    })

    const response = await result.json()

    if (!response.success) {
      return new errorResponse(false, response.message)
    }

    setAccessToken(response.data)

    return new successResponse(true, response.data, response.message)
  } catch (error) {
    console.error(error)
    return new errorResponse(false, "Internal Server Error")
  }
}