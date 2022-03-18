import { Router } from "express";
import { postOrders } from "../Controllers/orders.js";


const ordersRouter = Router();

ordersRouter.post("/order", postOrders)

export default ordersRouter