import { addRatings } from "../services/ratingsServices.js";

export async function add (req, res) {
    await addRatings(req.body, req.user.user_id)
}

export async function update (req, res) {
    await updateRating(req.body, req.user.user_id)
}