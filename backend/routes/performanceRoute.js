import { Router } from "express";
import { add, update, fetchSpms, fetchRatings, submit} from "../controllers/performanceController.js";
import { bodyValidator } from "../middlewares/bodyValidator.js";
import { verifyToken} from "../middlewares/userAuthenticate.js"
import { performanceValidator, updateValidator } from "../validators/performanceValidators.js";
import { validationResultChecker} from "../middlewares/validatorResult.js"


export const routes = new Router ();

routes.use(verifyToken)
routes.post('/add', bodyValidator,     add) // add performanceValidator, validationResultChecker later
routes.post('/update', bodyValidator,     update) // add performanceValidator, validationResultChecker later
routes.get('/fetchSpms', fetchSpms)
routes.get('/fetchRatings', fetchRatings)
routes.post('/submit', submit)
