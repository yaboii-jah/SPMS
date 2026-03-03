import { Router } from "express";
import { registerUser, logIn } from "../controllers/authController.js";
import { userValidator } from "../validators/userValidators.js";
import { validationResultChecker } from "../middlewares/validatorResult.js";

export const routes = new Router ();

routes.post('/register', Object.values(userValidator), validationResultChecker, registerUser)
routes.post('/login', logIn)