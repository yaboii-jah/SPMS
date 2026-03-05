import { Router } from "express";
import { registerUser, logIn, update } from "../controllers/authController.js";
import { userValidator, updateValidator, routeParamsValidator } from "../validators/userValidators.js";
import { validationResultChecker } from "../middlewares/validatorResult.js";
import { hashPassword } from "../utils/hashPassword.js";
import { bodyValidator} from "../middlewares/bodyValidator.js";
import { checkEquality } from "../middlewares/dataEquality.js";
import { verifyToken } from "../middlewares/userAuthenticate.js";

export const routes = new Router ();

routes.post('/register', bodyValidator, Object.values(userValidator), validationResultChecker, hashPassword, registerUser)
routes.post('/login', logIn)
routes.post('/update/:id', verifyToken, bodyValidator, routeParamsValidator, updateValidator, validationResultChecker, checkEquality, hashPassword, update) 