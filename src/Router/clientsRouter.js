import { Router } from "express";
import { getOrdersByClientId, postClients } from "../Controllers/clients.js";
import validateClientMiddleware from "../Middlewares/validateClientMIddleware.js";


const clientsRouter = Router();

clientsRouter.post("/clients", validateClientMiddleware, postClients)
clientsRouter.get("/clients/:id/orders", getOrdersByClientId)


export default clientsRouter;