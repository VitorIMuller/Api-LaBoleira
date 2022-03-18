import { Router } from "express";
import { postFlavours } from "../Controllers/flavours.js";
import validateFlavoursMiddleware from "../Middlewares/validateFlavoursMiddleware.js";

const flavoursRouter = Router();

flavoursRouter.post("/flavours", validateFlavoursMiddleware, postFlavours)



export default flavoursRouter