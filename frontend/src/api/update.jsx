import { successResponse, errorResponse } from "../utils/responseFormat";
import { refresh } from "./refresh";

export async function updatePerformance (performance, token, setToken) {
    console.log(performance)
    try {
        const result = await fetch('http://localhost:3005/performance/api/update', {
            method : 'POST',
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            credentials : "include",
            body: JSON.stringify(performance)
        });

        const response = await result.json()

        if (response.error === 403) {
            const result = await refresh(setToken)

            if (!result.success) {
                return new errorResponse(false, result.message)
            }

            const newToken = result.data;

            return await updatePerformance(performance, newToken, setToken);
        }

        if (!response.success) {
            return new errorResponse(false, response.message)
        }

        return new successResponse(true, null, response.message)
    } catch (error) {
        console.error("Internal Server Error", error)
        return new errorResponse(false, "Internal Server Error")
    }
}







