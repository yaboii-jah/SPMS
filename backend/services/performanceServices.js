import prisma from "../connection/prismaClient.js";
import { errorHandler } from "../utils/asyncErrorHandler.js";

export async function addPerformance (performance, user_id) {
   console.log(user_id)
   performance['user_id'] = user_id
   const result = errorHandler(() => prisma.performance.createMany({
        data : performance
   }))

   return result
}

// user_id is missing 