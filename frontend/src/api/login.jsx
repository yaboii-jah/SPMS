import { successResponse, errorResponse } from "../utils/responseFormat";

export async function LogUser (username, password, setAccessToken) {
    try {
        const response = await fetch('http://localhost:3005/auth/api/login', {
            method : 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            credentials : "include",
            body: JSON.stringify({
                username,
                password
            })
        });

        const result = await response.json();

        if (!result.success) {
            return new errorResponse(false, result.message)
        }
        
        setAccessToken(result.data)

        return new successResponse(true, result.data, result.message)
    } catch (error) {
        console.error("Internal Server Error", error)
        return new errorResponse(false, "Internal Server Error")
    }
}