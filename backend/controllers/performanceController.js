import { addPerformance, dynamicQuery, fetchUserData } from "../services/performanceServices.js";
import { successResponse, errorResponse } from "../utils/responseFormat.js";
import { errorHandler } from "../utils/asyncErrorHandler.js";

export async function add (req, res) {
    const result = await errorHandler(() => addPerformance(req.body, req.user.user_id))

    if (!result.success) {
        return res.status(500).send(new errorResponse(false, result.message, 'INTERNAL_SERVER_ERROR'))
    }

    res.status(201).send(new successResponse(true, result.data, 'SPMS Successfully Created'))
}

export async function update (req, res) {
   const result = await errorHandler(() => dynamicQuery(req.body, req.user.user_id))

   if (!result.success) {
        return res.status(500).send(new errorResponse(false, result.message, 'INTERNAL_SERVER_ERROR'))
   }

   res.status(201).send(new successResponse(true, result.data, 'SPMS Successfully Updated'))
}

export async function fetchSpms (req, res) {
   const result = await errorHandler(() => fetchUserData(req.user.user_id))
   
   res.status(200).send(new successResponse(true, result.data, 'Performance Succesfully Retrieved'))
}
