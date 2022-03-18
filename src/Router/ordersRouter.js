import { Router } from "express";
import { postOrders } from "../Controllers/orders.js";
import validateOrderMiddleware from "../Middlewares/validateOrderMIddleware.js";


const ordersRouter = Router();

ordersRouter.post("/order", validateOrderMiddleware, postOrders);

export default ordersRouter