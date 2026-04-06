import prisma from '../connection/prismaClient.js';
import { errorHandler } from '../utils/asyncErrorHandler.js';
import bcrypt from "bcrypt";
import { successResponse, errorResponse } from '../utils/responseFormat.js';

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
    try {
        const result = await prisma.users.findUnique({
            where : { username }
        })
        
        if (!result) {
            return new errorResponse(false, "Invalid Credentials", 404)
        }

        return new successResponse(true, result, "User successfully found")
    } catch (error) {
        console.error("Error finding user", error)
        return new errorResponse(false, "Internal server error", 500)
    }
}
 
export async function comparePassword (password, userPassword) {
    try {
        const result = await bcrypt.compare(password, userPassword)
        
        if (!result) { 
            return new errorResponse(false, "Invalid credentials", 401)
        }

        return new successResponse (true, result, "Valid credentials")
    } catch (error) {
        console.error("Error comparing password", error)
        return new errorResponse(false, "Internal server error", 500)
    }
   
}

export async function fetchUserDetails (user_id) {
    try {
        const result = await prisma.users.findUnique({
            where :{
                user_id
            }
        })
 
        if (!result) {
            return new errorResponse(false, 'Cannot find user', 404)
        }

        return new successResponse(true, result, 'User successfully retrieved')
    } catch (error) {
        console.error("Error finding user", error)
        return new errorResponse(false, "Internal server error", 500)
    }
}