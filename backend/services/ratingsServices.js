import prisma from "../connection/prismaClient.js";

export async function addRatings (ratings, user_id)  {
   ratings['user_id'] = user_id
   return await prisma.ratings.create({
    data : ratings
   })
}

export async function updateRatings (updatedRatings, user_id) {
    return await prisma.ratings.update({
        where : { user_id },
        data : updatedRatings
    })
}