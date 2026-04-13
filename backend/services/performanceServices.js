import prisma from "../connection/prismaClient.js";
import { successResponse, errorResponse } from '../utils/responseFormat.js';

export async function addPerformance (performance, user_id, tx = prisma) {
   console.log(performance['performance'])
   if (performance['performance'].length !== 0 ) {
      performance['performance'].forEach(perf => {
         perf['user_id'] = Number(user_id)
         delete perf['id']
      })
   }

   const rating_id = performance['ratings']['rating_id'] || 0

   performance['ratings']['user_id'] = user_id
   delete performance['ratings']['rating_id']
    
   try {
      return await prisma.$transaction(async (tx)=> {
         if (performance['performance'].length !== 0 ) {
            const performance_result = await tx.performance.createMany({
               data : performance['performance']
            })

            if (performance_result.count === 0) {
               throw new Error('No data is created')
            }
         }

         await prisma.ratings.upsert({
            where: { rating_id: rating_id},
            update: performance['ratings'],
            create: performance['ratings'],
         })

         return new successResponse(true, null, "Performance successfully created")
      })
   } catch (error) {
      console.error(error)
      return new errorResponse(false, "Internal server error", 500)
   } 
}

export async function updatePerformance (updatedPerformance, user_id, tx = prisma) {
   try {
      const updates = updatedPerformance.map(perf => 
         tx.performance.update({
            where : { performance_id : perf.performance_id, user_id },
            data : perf
         })
      )

      const result = await Promise.all(updates)
      return new successResponse(true, result, 'Performance updated')
  } catch (error) {
      console.error(error)
      return new errorResponse(false, "Internal server error", 500)
  } 
}

async function deletePerformance (Ids, user_id, tx = prisma) {
   try {
      const result = await tx.performance.deleteMany({
         where : {
            performance_id : {
               in : Ids
            },
            user_id
         }
      })

      if (result.count === 0) {
         return new errorResponse(false, 'No data were deleted', 409)
      }

      return new successResponse(true, null, 'Performance successfully deleted')
  } catch (error) {
      console.error(error)
      return new errorResponse(false, "Internal server error", 500)
  } 
}

export async function fetchUserData (user_id) {
   try {
      const result = await prisma.performance.findMany({
         where : {
            user_id,
            is_valid : 'True',
            is_submitted : 'False'
         }
      })

      if (result.length === 0) {
         return new errorResponse(false, 'Cannot find any data', 404)
      }

      return new successResponse(true, result, 'Performance successfully retrieved')
   } catch (error) {
      console.error(error)
      return new errorResponse(false, "Internal server error", 500)
   }

}

export async function fetchUserRatings (user_id) {
   try {
      const result = await prisma.ratings.findMany({
         where : {
            user_id,
            is_valid : 'True',
            is_submitted : 'False'
         }
      })

      if (result.length === 0) {
         return new errorResponse(false, 'Cannot find any data', 404)
      }
      
      return new successResponse(true, result, 'Ratings successfully retrieved')
   } catch (error) {
      console.error(error)
      return new errorResponse(false, "Internal server error", 500)
   }
   
}

export async function submitPerformance (user_id) {
   try {
      return await prisma.$transaction(async (tx)=> {
         const perf_result = await tx.performance.updateMany({
            where : {
               user_id,
               is_valid : 'True',
               is_submitted : 'False'
            },
            data : {
               is_valid : 'False',
               is_submitted : 'True'
            }
         })

         if (perf_result.count === 0 ) throw new Error('No performance data has been updated')

         const rating_result = await tx.ratings.updateMany({
            where : {
               user_id,
               is_valid : 'True',
               is_submitted : 'False'
            },
            data : {
               is_valid : 'False',
               is_submitted : 'True'
            }
         })

         if (perf_result.count === 0 ) throw new Error('No rating data has been updated')

         return new successResponse(true, null, "Performance submitted successfully")
      })
   } catch (error) {
      console.error(error)
      return new errorResponse(false, "Internal server error", 500)
   }
}

export async function dynamicQuery (data, user_id) {
   const userData = await fetchUserData(user_id)
   let dataToUpdate = []
   let dataToDelete = []
   let dataToCreate = {
      performance : [],
      ratings : data['ratings']
   }

   for (const form of data['performance']) {
      if (form.action === 'update' && userData['data'].some(data => data.performance_id === form.performance_id) ) {
         delete form.action
         delete form['express-validator#contexts']
         delete form.id
         dataToUpdate.push({...form})
      }

      if (form.action === 'delete' && userData['data'].some(data => data.performance_id === form.performance_id)) {
         dataToDelete.push(form.performance_id)
      }

      if (form.action === 'create') {
         delete form['express-validator#contexts']
         delete form.action
         delete form.id
         dataToCreate.performance.push(form)
      }
   }

   try {
      return await prisma.$transaction(async (tx)=> {
         if (dataToDelete.length > 0 ) {
            const result = await deletePerformance(dataToDelete, user_id, tx)
            
            if (!result.success) throw new Error(result.message)
         }

         if (dataToUpdate.length > 0 ) {
            const result = await updatePerformance(dataToUpdate, user_id, tx)
            if (!result.success) throw new Error(result.message)
         }

         const result = await addPerformance(dataToCreate, user_id, tx)

         if (!result.success) throw new Error(result.message)
         
        return new successResponse(true, null, 'SPMS successfully updated')
      }) 
   } catch (error) {
      console.error(error)
      return new errorResponse(false, "Internal server error", 500)
   }
}

