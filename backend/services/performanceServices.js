import prisma from "../connection/prismaClient.js";
import { errorHandler } from "../utils/asyncErrorHandler.js";

export async function addPerformance (performance) {
   const result = errorHandler(() => prisma.performance.createMany({
        data : performance
   }))

   return result
}