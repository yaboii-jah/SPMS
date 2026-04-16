import { addPerformance, dynamicQuery, fetchUserData, fetchUserRatings, submitPerformance, fetchPerformance } from "../services/performanceServices.js";
import { successResponse, errorResponse } from "../utils/responseFormat.js";
import { errorHandler } from "../utils/asyncErrorHandler.js";

export async function add (req, res) {
    const result = await addPerformance(req.body, req.user.user_id)

    if (!result.success) {
        return res.status(result.error).send(new errorResponse(false, result.message, result.error))
    }

    res.status(201).send(new successResponse(true, result.data, result.message))
}

export async function update (req, res) {
   const result = await dynamicQuery(req.body, req.user.user_id)

   if (!result.success) {
        return res.status(result.error).send(new errorResponse(false, result.message, result.error))
   }

   res.status(201).send(new successResponse(true, null, 'SPMS successfully updated'))
}

export async function fetchSpms (req, res) {
   const result = await fetchUserData(req.user.user_id)

   if (!result.success) {
        return res.status(result.error).send(new errorResponse(false, result.message, result.error))
    }
   
   res.status(200).send(new successResponse(true, result.data, 'Performance successfully retrieved'))
}

export async function fetchRatings (req, res) {
    const result = await fetchUserRatings(req.user.user_id)
    
    if (!result.success) {
        return res.status(result.error).send(new errorResponse(false, result.message, result.error))
    }
   
    res.status(200).send(new successResponse(true, result.data, 'Ratings Successfully Retrieved'))
}

export function verifiedToken (req, res) {
    res.send(new successResponse(true, null, 'Token successfully validated'))
}

export async function submit(req, res) {
    const result = await submitPerformance(req.user.user_id)

    if (!result.success) {
        return res.status(result.error).send(new errorResponse(false, result.message, result.error))
    }

      res.status(200).send(new successResponse(true, null, result.message))
}

export async function fetchAllPerformance (req, res) {
    const result = await fetchPerformance()

    if (!result.success) {
        return res.status(result.error).send(new errorResponse(false, result.message, result.error))
    }

      res.status(200).send(new successResponse(true, result.data, result.message))
}
