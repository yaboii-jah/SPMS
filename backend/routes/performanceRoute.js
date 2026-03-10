import { Router } from "express";
import { add, update} from "../controllers/performanceController.js";
import { bodyValidator } from "../middlewares/bodyValidator.js";
import { verifyToken } from "../middlewares/userAuthenticate.js"
import { performanceValidator, updateValidator } from "../validators/performanceValidators.js";


export const routes = new Router ();

routes.use(verifyToken)

routes.post('/add', bodyValidator, performanceValidator, add)
routes.post('/update', bodyValidator, updateValidator, update)

[
  {
    "key_perf" : "IT Equipment distributed",
    "succes_indic" : "At least 95% of all IT equipment configured and/or distributed within Citizen Charter targets",
    "alloted_budget" : "120000",
    "division_individuals_accountable" : "JR, Christine, Joshua",
    "actual_accomp" : "2 Laptops configured",
    "quality" : 0,
    "efficiency" : 5,
    "timeliness" : 4,
    "category" : "strat_obj"
  },
  
  {
    "key_perf" : "No. of systems enhanced/developed",
    "succes_indic" : "At least 95% of all IT requests resolved within Citizen Charter targets",
    "actual_accomp" : "49 requests received for the period with 98.38% of requests resolved within ARTA resolution times",
    "quality" : 5,
    "efficiency" : 0,
    "timeliness" : 4,
    "category" : "core_sup_func"
  }
]