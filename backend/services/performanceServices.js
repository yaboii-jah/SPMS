import prisma from "../connection/prismaClient.js";
import { errorHandler } from "../utils/asyncErrorHandler.js";

export async function addPerformance (performance, user_id) {
   performance.forEach(perf => perf['user_id'] = Number(user_id))
   const result = errorHandler(() =>  prisma.performance.createMany({
        data : performance
   }))

   return result
}

export async function updatePerformance (updatedPerformance) {
   const result = errorHandler(() => prisma.$transaction(
      updatedPerformance.map(perf => 
         prisma.performance.update({
            where : { performance_id : perf.performance_id },
            data : perf
         })
      )
   ))

   return result
}

// user_id is missing 