import { Router } from "express";
import { getOrderById, getOrders, postOrders, updateDelivery } from "../Controllers/orders.js";
import validateOrderMiddleware from "../Middlewares/validateOrderMIddleware.js";


const ordersRouter = Router();

ordersRouter.post("/order", validateOrderMiddleware, postOrders);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrderById)
ordersRouter.patch("/order/:id", updateDelivery)
export default ordersRouter