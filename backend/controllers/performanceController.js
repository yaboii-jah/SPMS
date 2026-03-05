import { addPerformance } from "../services/performanceServices.js";
import { successResponse, errorResponse } from "../utils/responseFormat.js";

export async function add (req, res) {
    const result = await addPerformance(req.body)

    if (!result.success) {
        return res.status(500).send(new errorResponse(false, result.message, 'INTERNAL_SERVER_ERROR'))
    }

    res.status(201).send(new successResponse(true, result.data, 'Performance Successfully Created'))
}