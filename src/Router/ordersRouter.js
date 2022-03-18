import { Router } from "express";
import { getOrderById, getOrders, postOrders } from "../Controllers/orders.js";
import validateOrderMiddleware from "../Middlewares/validateOrderMIddleware.js";


const ordersRouter = Router();

ordersRouter.post("/order", validateOrderMiddleware, postOrders);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrderById)
export default ordersRouter