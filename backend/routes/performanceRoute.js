import { Router } from "express";
import { add } from "../controllers/performanceController.js";
import { bodyValidator } from "../middlewares/bodyValidator.js";
import { verifyToken } from "../middlewares/userAuthenticate.js"


export const routes = new Router ();

routes.post('/add', verifyToken , bodyValidator , add)
