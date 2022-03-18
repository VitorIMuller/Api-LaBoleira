import { Router } from "express";
import { postCakes } from "../Controllers/cakes.js";
import { validateCakeMIddleware } from "../Middlewares/validateCakeMiddleware.js";


const cakesRouter = Router();

cakesRouter.post("/cakes", validateCakeMIddleware, postCakes)


export default cakesRouter