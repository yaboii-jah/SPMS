import prisma from "../connection/prismaClient.js";
import { errorHandler } from "../utils/asyncErrorHandler.js";
import { errorResponse } from "../utils/responseFormat.js";

export async function checkEquality (req, res, next) {
   const result = await errorHandler(() => prisma.users.findUnique({
        where : {
            user_id : req.params.id
        }
   }))
  
   if (!result.data) {
    return res.status(404).send(new errorResponse(false, "Can't find any data", "DATA_NOT_FOUND"))
   }

   next()
}