import { Router } from "express";
import { verifyToken} from "../middlewares/userAuthenticate.js"
import { add, update } from "../controllers/ratingsController.js";

export const routes = new Router ();

routes.use(verifyToken)
routes.post('/add', add)
routes.patch('/update', update)