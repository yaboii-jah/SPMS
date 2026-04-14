import { errorResponse, successResponse } from "../utils/responseFormat";

export async function register (token, data) {
    try {
        const response = await fetch('http://localhost:3005/auth/api/register', {
            method : 'POST',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            credentials : "include",
            body: JSON.stringify(data)
        });
    
        const result = await response.json();

        if (!result.success) {
            return new errorResponse(false, result.message)
        }

        return new successResponse(true, null, result.message)

        } catch (error) {
            console.error("Internal Server Error", error)
            return new errorResponse(false, "Internal Server Error")
    }
}