import prisma from '../connection/prismaClient.js';
import { errorHandler } from '../utils/asyncErrorHandler.js';

export async function createUser (user) {
    const result = await errorHandler ( () => prisma.users.create ({
       data : user
    }))

    return result
}

export async function updateUser (user_id, details) {
    const result = await errorHandler ( () => prisma.users.update ({
       where : { user_id },
       data : details
    }))

    return result
}