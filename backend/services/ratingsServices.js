import { useOptimistic } from "react";
import prisma from "../connection/prismaClient.js";
import { successResponse, errorResponse } from '../utils/responseFormat.js';

export async function updateRatings (updatedRatings, user_id) {
    return await prisma.ratings.update({
        where : { user_id, rating_id : updatedRatings.rating_id },
        data : updatedRatings
    })
}