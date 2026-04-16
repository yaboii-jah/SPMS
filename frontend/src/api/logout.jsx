import { successResponse, errorResponse } from "../utils/responseFormat";

export async function LogOut (token) {
    try {
        const response = await fetch('http://localhost:3005/auth/api/logout', {
            method : 'GET',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            credentials : "include"
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