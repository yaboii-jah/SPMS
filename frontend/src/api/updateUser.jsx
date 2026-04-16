import { successResponse, errorResponse } from "../utils/responseFormat";
import { refresh } from "./refresh";

export async function updateUser (user, id, token, setToken, setUserRole) {
    delete user.user_id
    
    try {
      const result = await fetch(`http://localhost:3005/auth/api/update/${id}`, {
          method : 'PATCH',
          headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : "application/json"
          },
          credentials : "include",
          body: JSON.stringify(user)
      });

      const response = await result.json()

      if (response.error === 403) {
          const result = await refresh(setToken, setUserRole)

          if (!result.success) {
              return new errorResponse(false, result.message)
          }

          const newToken = result.data.token;

          return await updateUser(user, id, newToken, setToken, setUserRole);
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