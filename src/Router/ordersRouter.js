import { Router } from "express";
import { getOrders, postOrders } from "../Controllers/orders.js";
import validateOrderMiddleware from "../Middlewares/validateOrderMIddleware.js";


const ordersRouter = Router();

ordersRouter.post("/order", validateOrderMiddleware, postOrders);
ordersRouter.get("/orders", getOrders)
export default ordersRouter