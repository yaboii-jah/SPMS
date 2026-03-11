import { Router } from "express";
import { add, update} from "../controllers/performanceController.js";
import { bodyValidator } from "../middlewares/bodyValidator.js";
import { verifyToken } from "../middlewares/userAuthenticate.js"
import { performanceValidator, updateValidator } from "../validators/performanceValidators.js";
import { validationResultChecker} from "../middlewares/validatorResult.js"


export const routes = new Router ();

routes.use(verifyToken)
routes.post('/add', bodyValidator, performanceValidator, validationResultChecker, add)
routes.patch('/update', bodyValidator, updateValidator, validationResultChecker, update)

