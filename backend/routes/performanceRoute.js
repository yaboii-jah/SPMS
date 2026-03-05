import { Router } from "express";
import { add } from "../controllers/performanceController.js";
import { bodyValidator } from "../middlewares/bodyValidator.js";

export const routes = new Router ();

routes.post('/add', bodyValidator , add)
