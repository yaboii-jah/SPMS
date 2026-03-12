import prisma from '../connection/prismaClient.js';
import { errorHandler } from '../utils/asyncErrorHandler.js';
import bcrypt from "bcrypt";

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

export async function findUser (username) {
    const result = await errorHandler(() => prisma.users.findUnique({
        where : { username }
    }))

    return result
}
 
export async function comparePassword (password, userPassword) {
    const result = await errorHandler(() => bcrypt.compare(password, userPassword))

    return result
}

export async function fetchUserDetails (user_id) {
    return prisma.users.findUnique({
        where :{
            user_id
        }
    })
}