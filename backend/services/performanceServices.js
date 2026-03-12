import prisma from "../connection/prismaClient.js";

export async function addPerformance (performance, user_id, tx = prisma) {
   performance.forEach(perf => perf['user_id'] = Number(user_id))
   await tx.performance.createMany({
        data : performance
   })
}

export async function updatePerformance (updatedPerformance, user_id, tx = prisma) {
   const updates = updatedPerformance.map(perf => 
      tx.performance.update({
         where : { performance_id : perf.performance_id, user_id },
         data : perf
      })
   )

   return Promise.all(updates)
}

async function deletePerformance (Ids, user_id, tx = prisma) {
   await tx.performance.deleteMany({
      where : {
         performance_id : {
            in : Ids
         },
         user_id
      }
   })
}

export async function fetchUserData (user_id) {
   return await prisma.performance.findMany({
      where : {
         user_id
      }
  })
}

export async function dynamicQuery (data, user_id) {
   const userData = await fetchUserData(user_id)
   let dataToUpdate = []
   let dataToDelete = []
   let dataToCreate = []

   for (const form of data) {
      if (form.action === 'update' && userData.some(data => data.performance_id === form.performance_id) ) {
         delete form.action
         delete form['express-validator#contexts']
         dataToUpdate.push(form)
      }

      if (form.action === 'delete' && userData.some(data => data.performance_id === form.performance_id)) {
         dataToDelete.push(form.performance_id)
      }

      if (form.action === 'create') {
         delete form['express-validator#contexts']
         delete form.action
         dataToCreate.push(form)
      }
   }

   return await prisma.$transaction(async (tx)=> {
      
      if (dataToDelete.length > 0 ) {
         await deletePerformance(dataToDelete, user_id, tx)
      }

      if (dataToUpdate.length > 0 ) {
         await updatePerformance(dataToUpdate, user_id, tx)
      }

      if (dataToCreate.length > 0 ) {
         await addPerformance(dataToCreate, user_id, tx)
      }
   })
}


// user_id is missing 