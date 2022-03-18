import { Router } from "express";
import { postClients } from "../Controllers/clients.js";
import validateClientMiddleware from "../Middlewares/validateClientMIddleware.js";


const clientsRouter = Router();

clientsRouter.post("/clients", validateClientMiddleware, postClients)



export default clientsRouter;